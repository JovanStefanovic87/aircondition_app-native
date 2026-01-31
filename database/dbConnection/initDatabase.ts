import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const DB_NAME = 'AC_inspector.db';
const PACKAGE_NAME = 'com.acinspector';
let database: SQLite.SQLiteDatabase | null = null;

const getPossibleAndroidPaths = () => {
    return [
        `/data/user/0/${PACKAGE_NAME}/databases/${DB_NAME}`,
        `/data/data/${PACKAGE_NAME}/databases/${DB_NAME}`,
        `${RNFS.DocumentDirectoryPath}/../databases/${DB_NAME}`,
    ];
};

export const findExistingDbPath = async (): Promise<string> => {
    const possiblePaths = [
        `/data/user/0/${PACKAGE_NAME}/databases/${DB_NAME}`,
        `/data/data/${PACKAGE_NAME}/databases/${DB_NAME}`,
        `${RNFS.DocumentDirectoryPath}/../databases/${DB_NAME}`,
    ];

    for (const path of possiblePaths) {
        if (await RNFS.exists(path)) {
            return path;
        }
    }

    throw new Error(`SQLite database not found. Checked paths:\n${possiblePaths.join('\n')}`);
};

export const checkFreshInstall = async () => {
    const installedFlag = await AsyncStorage.getItem('AC-Inspector-Installed');

    if (!installedFlag) {
        try {
            if (Platform.OS === 'android') {
                const paths = getPossibleAndroidPaths();
                for (const path of paths) {
                    const exists = await RNFS.exists(path);
                    if (exists) {
                        console.log('Deleting existing DB at:', path);
                        await RNFS.unlink(path).catch(() => {});
                        await RNFS.unlink(`${path}-shm`).catch(() => {});
                        await RNFS.unlink(`${path}-wal`).catch(() => {});
                        await RNFS.unlink(`${path}-journal`).catch(() => {});
                        await AsyncStorage.removeItem('dbMigrationStatus');
                    }
                }
            }
            await AsyncStorage.setItem('AC-Inspector-Installed', 'true');
        } catch (err) {
            console.error('Error deleting old DB:', err);
        }
    }
};

export const initDatabase = async () => {
    try {
        if (!database) {
            database = await SQLite.openDatabase({ name: DB_NAME, location: 'default' });
        }
    } catch (error) {
        console.error('Error opening database: ', error);
        throw error;
    }
};

export const getDatabase = () => {
    if (!database) throw new Error('Database not initialized');
    return database;
};

export const dbConnectionExist = () => {
    try {
        getDatabase();
    } catch {
        return false;
    }
    return true;
};

export const getDatabaseFilePath = () => {
    if (Platform.OS === 'android') {
        return `${RNFS.DocumentDirectoryPath}/../databases/${DB_NAME}`;
    }
    throw new Error('Unsupported platform');
};

export const databaseFileExists = async () => {
    const path = getDatabaseFilePath();
    return RNFS.exists(path);
};

export const deleteLocalDatabase = async () => {
    try {
        const db = getDatabase();

        await new Promise<void>((resolve) => {
            db.close(resolve, resolve as any);
        });

        const dbPath = await findExistingDbPath();

        const filesToDelete = [dbPath, `${dbPath}-wal`, `${dbPath}-shm`];

        for (const path of filesToDelete) {
            const exists = await RNFS.exists(path);
            if (exists) {
                await RNFS.unlink(path);
            }
        }
    } catch (err) {
        throw err;
    }
};
