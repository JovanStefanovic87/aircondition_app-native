import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { checkSession } from '../dataAccess/Helper/auth';
import { AuthenticatedUser } from '../types';

import { runDBUpdates } from '../dbUpdates/runUpdates';
import { downloadLatestDb, backupDbExists } from '../../src/api/uploadSqliteBackupToS3';

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

/**
 * Checks if the app is being launched for the first time after installation. If so, it deletes any existing database files from previous installations to ensure a clean state.
 */
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

/**
 * Initializes the SQLite database connection. If the database is already initialized, it does nothing. Otherwise, it opens a new connection to the database file.
 * It will create new database file if it doesn't exist, but it won't delete any existing files. The responsibility of ensuring a clean state on fresh install is handled by the checkFreshInstall function.
 */
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
    try {
        await findExistingDbPath();
        return true;
    } catch {
        return false;
    }
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

        database = null;
    } catch (err) {
        throw err;
    }
};

/**
 * Completes database initialization after the user has logged in for the first
 * time (i.e. when initializeApp deferred because there was no session and no
 * local DB). Checks S3 for a backup, downloads it if present, then opens the
 * connection and runs any pending schema migrations.
 *
 * Throws on failure so the caller can surface the error in the login UI.
 */
export const initializeAppPostLogin = async (user: AuthenticatedUser): Promise<void> => {
    const localDbExists = await databaseFileExists();

    if (!localDbExists) {
        const backupExists = await backupDbExists(user.username);

        if (backupExists) {
            console.log('Backup DB found on S3, downloading...');
            const targetPath = getDatabaseFilePath();
            await downloadLatestDb(user.username, targetPath);
        }
    }

    await initDatabase();
    await runDBUpdates();
};

/**
 * Initializes the application on startup. Handles all install/update scenarios:
 *
 * 1. Fresh install over old installation: `checkFreshInstall` detects the missing
 *    install flag and deletes any leftover database files from the previous install,
 *    ensuring a clean slate before a new database is created.
 *
 * 2. No active session (first install or expired session): DB initialization is
 *    deferred entirely to after login via `initializeAppPostLogin`, so the user's
 *    S3 backup can be checked before any local DB is created or opened.
 *
 * 3. Reinstall with an S3 backup: If the user has an active session but no local
 *    database file exists, the function checks S3 for a backup. If one is found it
 *    is downloaded to the expected path before opening the connection. `runDBUpdates`
 *    then applies any schema migrations that are newer than the downloaded backup.
 *
 * 4. Normal launch (database already exists and is up to date): `initDatabase`
 *    simply opens the existing database connection. `runDBUpdates` checks the current
 *    schema version and exits immediately when no newer SQL scripts are found.
 *
 * In all cases `setLoading(false)` is called in the `finally` block so the loading
 * screen is dismissed regardless of success or failure. If an error occurs,
 * `setError` is called with a human-readable message before the loading screen
 * is dismissed, allowing the caller to display the error to the user.
 */
export const initializeApp = async (
    setLoading: (value: boolean) => void,
    setError: (error: string) => void,
) => {
    try {
        await checkFreshInstall();

        const user = await new Promise<any>((resolve) => {
            checkSession(resolve);
        });

        if (!user) {
            // No active session — defer all DB initialization to after login
            // so the user's S3 backup can be checked first.
            return;
        }

        await initializeAppPostLogin(user);
    } catch (err) {
        console.error('App initialization failed:', err);
        setError(err instanceof Error ? err.message : 'App initialization failed');
    } finally {
        setLoading(false);
    }
};
