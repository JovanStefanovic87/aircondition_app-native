import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticatedUser, User } from '../../types';
import { getUserByEmail, getUserById } from '../Query/sqlQueries';
import { executeUpdateOrInsertWithGuid } from '../Command/baseCommand';
import scrypt from 'scrypt-js';
import 'fast-text-encoding';
import { Buffer } from 'buffer';
import { tableExists } from './helpers';

if (typeof global.Buffer === 'undefined') {
    global.Buffer = Buffer;
}

const SALT = new TextEncoder().encode('your-fixed-salt'); // Store this securely!

/***
 * 2^8 = 256 (very fast, insecure)
 * 2^10 = 1024 (reasonable but fast)
 * 2^12 = 4096 (good balance for many use cases)
 * 2^14 = 16384 (higher security, slower)
 */
const hashPassword = async (password: string): Promise<string> => {
    const passwordBuffer = new TextEncoder().encode(password);
    const N = 2 ** 12, // CPU/memory cost parameter
        r = 8,
        p = 1,
        dkLen = 64;

    const derivedKey = await scrypt.scrypt(passwordBuffer, SALT, N, r, p, dkLen);
    return Buffer.from(derivedKey).toString('hex');
};

export const registerUser = async (
    name: string,
    email: string,
    password: string,
    roleId?: number,
) => {
    try {
        const hashedPassword = await hashPassword(password);

        const user = {
            name,
            email,
            password: hashedPassword,
            roleId: roleId || 2,
        };

        executeUpdateOrInsertWithGuid<User>('User', user);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
};

export const loginUser = async (
    email: string,
    password: string,
    keepMeLoggedIn: boolean,
    callback: (success: boolean, user?: AuthenticatedUser) => void,
) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            callback(false);
            return;
        }

        const hashedPassword = await hashPassword(password);

        if (hashedPassword === user.password) {
            if (keepMeLoggedIn) {
                await AsyncStorage.setItem('userId', user.id);
                await AsyncStorage.removeItem('sessionExpiry');
            } else {
                const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
                await AsyncStorage.setItem('userId', user.id);
                await AsyncStorage.setItem('sessionExpiry', expiryTime.toString());
            }

            const sanitizedUser: AuthenticatedUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
            };

            callback(true, sanitizedUser);
        } else {
            callback(false);
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        callback(false);
    }
};

export const logoutUser = async () => {
    console.log('Logging out user...');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('sessionExpiry');
};

export const isSessionValid = async (): Promise<boolean> => {
    const sessionExpiry = await AsyncStorage.getItem('sessionExpiry');
    if (sessionExpiry) {
        const expiryTime = parseInt(sessionExpiry, 10);
        if (Date.now() > expiryTime) {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('sessionExpiry');
            return false;
        }
    }
    return true;
};

export const getStoredUser = async (): Promise<AuthenticatedUser | null> => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId || !(await isSessionValid())) return null;

        const tableExist = await tableExists('User');

        if (!tableExist) return null;

        return (await getUserById(userId)) || null;
    } catch (error) {
        console.error('Error retrieving user:', error);
        return null;
    }
};

export const checkSession = async (callback: (user?: AuthenticatedUser) => void) => {
    try {
        const user = await getStoredUser();
        callback(user || undefined);
    } catch (error) {
        console.error('Error checking session:', error);
        callback();
    }
};
