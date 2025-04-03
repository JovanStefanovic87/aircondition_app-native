import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticatedUser, User } from '../../types';
import { getUserByEmail, getUserById } from '../Query/sqlQueries';
import bcrypt from 'react-native-bcrypt';
import { executeUpdateOrInsertWithGuid } from '../Command/baseCommand';
import { randomBytes } from 'react-native-randombytes';

bcrypt.setRandomFallback((len: number) => Array.from(randomBytes(len)));

/**
 * registerUser - Function registers a new user in the system
 * @param name - User name
 * @param email - User email
 * @param password - User password
 * @param roleId - User role ID (default=2), admin=1, user=2
 */
export const registerUser = (name: string, email: string, password: string, roleId?: number) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }

        const user = {
            name: name,
            email: email,
            password: hash,
            roleId: roleId || 2,
        };

        executeUpdateOrInsertWithGuid<User>('User', user);
    });
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

        bcrypt.compare(password, user.password, async (err, res) => {
            if (err) {
                console.error('Error comparing password:', err);
                callback(false);
                return;
            }

            if (res) {
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
        });
    } catch (error) {
        console.error('Error in loginUser:', error);
        callback(false);
    }
};

export const logoutUser = async () => {
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

        return (await getUserById(userId)) || null; // Fetch user from DB
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
