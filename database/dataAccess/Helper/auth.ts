import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticatedUser } from '../../types';
import NetInfo from '@react-native-community/netinfo';
import { authenticateUser } from '../../../src/api/login';

export const loginUser = async (
    username: string,
    password: string,
    callback: (success: boolean, user?: AuthenticatedUser, error?: string) => void,
) => {
    try {
        const netState = await NetInfo.fetch();
        if (!netState.isConnected) {
            callback(false, undefined, 'Keine Internetverbindung.');
            return;
        }

        const response = await authenticateUser(username, password);

        if (!response) {
            callback(false, undefined, 'Verbindung zum Server fehlgeschlagen.');
            return;
        }

        if (!response.ok) {
            callback(false, undefined, 'Benutzername oder Passwort ist falsch.');
            return;
        }

        const data = await response.json();

        const user: AuthenticatedUser = {
            id: data.user.id,
            username: data.user.username,
            token: data.token,
        };

        await AsyncStorage.setItem('userToken', user.token);
        await AsyncStorage.setItem('userId', user.id);
        await AsyncStorage.setItem('username', user.username);

        const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        await AsyncStorage.setItem('sessionExpiry', expiryTime.toString());

        callback(true, user);
    } catch (error) {
        console.error('Fehler beim Login:', error);
        callback(false, undefined, 'Unbekannter Fehler.');
    }
};

export const logoutUser = async () => {
    await AsyncStorage.multiRemove(['userId', 'username', 'userToken', 'sessionExpiry']);
};

let _onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void): void => {
    _onUnauthorized = handler;
};

export const handleUnauthorized = async (): Promise<void> => {
    await logoutUser();
    _onUnauthorized?.();
};

export const isSessionValid = async (): Promise<boolean> => {
    const sessionExpiry = await AsyncStorage.getItem('sessionExpiry');
    const userId = await AsyncStorage.getItem('userId');
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('userToken');

    if (!sessionExpiry || !userId || !username || !token) {
        return false;
    }

    const expiryTime = parseInt(sessionExpiry, 10);
    if (Date.now() > expiryTime) {
        await AsyncStorage.multiRemove(['userId', 'username', 'userToken', 'sessionExpiry']);
        return false;
    }

    return true;
};

export const getStoredUser = async (): Promise<AuthenticatedUser | null> => {
    try {
        const isValid = await isSessionValid();
        if (!isValid) return null;

        const id = await AsyncStorage.getItem('userId');
        const username = await AsyncStorage.getItem('username');
        const token = await AsyncStorage.getItem('userToken');

        if (id && username && token) {
            return { id, username, token };
        }

        return null;
    } catch (error) {
        console.error('Error retrieving user from storage:', error);
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
