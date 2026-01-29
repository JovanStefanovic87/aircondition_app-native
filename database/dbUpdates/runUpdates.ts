// runUpdates.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';
import { getDatabase } from '../dbConnection/initDatabase';
import uuid from 'react-native-uuid';

async function getCurrentDatabaseVersion() {
    const db = getDatabase();
    return await new Promise<number>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT MAX(version) AS currentVersion FROM DatabaseVersion',
                [],
                (_, result) => {
                    const currentVersion = result.rows.item(0).currentVersion || 0;
                    resolve(currentVersion);
                },
                (_, error) => {
                    resolve(0);
                },
            );
        });
    });
}

async function executeSqlScript(scriptContent: string) {
    const db = getDatabase();

    return new Promise<void>((resolve, reject) => {
        const statements = scriptContent
            .split(';')
            .map((s) => s.trim())
            .filter(Boolean);

        const generateGuids = (script: string) => script.replace(/<GUID>/g, () => `'${uuid.v4()}'`);

        db.transaction(
            (tx) => {
                tx.executeSql('PRAGMA foreign_keys = ON');

                let index = 0;

                const runNext = () => {
                    if (index >= statements.length) {
                        resolve();
                        return;
                    }

                    const sql = generateGuids(statements[index]);
                    index++;

                    tx.executeSql(
                        sql,
                        [],
                        () => runNext(),
                        (_, error) => {
                            console.log('FAILED SQL:', sql);
                            reject(error);
                            return false;
                        },
                    );
                };

                runNext();
            },
            (error) => reject(error),
        );
    });
}

async function updateDatabaseVersion(newVersion: number) {
    const db = getDatabase();
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO DatabaseVersion (version) VALUES (?)',
                [newVersion],
                (_, result) => {
                    tx.executeSql(
                        'COMMIT',
                        [],
                        () => {
                            resolve();
                        },
                        (_, error) => {
                            reject(error);
                        },
                    );
                },
                (_, error) => {
                    reject(error);
                },
            );
        });
    });
}

export async function runDBUpdates() {
    const currentVersion = await getCurrentDatabaseVersion();

    const readSqlFile = async (version: number) => {
        const scriptPath = `dbUpdates/v${version}.sql`;
        const scriptContent = await fs.readFileAssets(scriptPath);
        return scriptContent;
    };

    async function runDbUpdate(version: number) {
        try {
            const scriptContent = await readSqlFile(version);

            await executeSqlScript(scriptContent);

            // Update the database_version table after each successful update
            if (version > 1) await updateDatabaseVersion(version);

            // Process the next update
            await runDbUpdate(version + 1);
        } catch (error) {
            if (error?.code === 'ENOENT') {
                // File not found, nothing to update
                console.log(`Database version v${version - 1} is up to date.`);
            } else {
                // Handle other errors during script execution
                console.error(`Error executing update script v${version}:`, error);
            }
        }
    }

    // Start processing updates
    try {
        await runDbUpdate(currentVersion + 1);
        await AsyncStorage.setItem('dbMigrationStatus', 'done');
        console.log('All updates were successful.');
    } catch (error) {
        console.error('Error processing updates:', error);
    }
}

export const clearDBInitialization = async () => {
    await AsyncStorage.removeItem('hasInitialized');
};
