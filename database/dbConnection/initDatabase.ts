import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const DB_NAME = 'AC_inspector.db';
let database: SQLite.SQLiteDatabase | null = null;

const getPossibleAndroidPaths = () => {
    const packageName = 'com.acinspector';
    return [
        `/data/user/0/${packageName}/databases/${DB_NAME}`,
        `/data/data/${packageName}/databases/${DB_NAME}`,
        `${RNFS.DocumentDirectoryPath}/../databases/${DB_NAME}`,
    ];
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
