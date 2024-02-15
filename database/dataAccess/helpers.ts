
import SQLite from 'react-native-sqlite-storage';
import DatabaseHelper from './getAllTablesClass';
import { DatabaseVersionType, DeviceType, InspectionType } from '../types';
import { getDatabase } from '../dbConnection/initDatabase';
import uuid from 'react-native-uuid';
import { executeQuery } from './Query/baseQuery';
import { mapDatabaseVersionType } from '../dataMappers/mappers';

export const insertSqlite = async () => {
    try {
        console.log('Running SQL command');

        const db = await SQLite.openDatabase({ name: 'AC_inspector.db', location: 'default' });

        console.log('db: ', JSON.stringify(db));

        db.transaction((tx) => {
            // Check if the 'Test' table exists
            tx.executeSql(
                'SELECT name FROM sqlite_master WHERE type="table" AND name="Test"',
                [],
                (_, result) => {
                    if (result.rows.length === 0) {
                        // Table does not exist, create it
                        tx.executeSql(
                            'CREATE TABLE Test (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT)',
                            [],
                            (_, createResult) => {
                                console.log('Table created successfully');
                                // Now, insert data into the newly created table
                                tx.executeSql(
                                    'INSERT INTO Test (Id, Name) VALUES (?, ?)',
                                    [1, 'Darko Sovilj'],
                                    (_, insertResult) => {
                                        console.log('Record inserted successfully');
                                    },
                                    (_, insertError) => {
                                        console.log('Error inserting record: ', insertError);
                                    }
                                );
                            },
                            (_, createError) => {
                                console.log('Error creating table: ', createError);
                            }
                        );
                    } else {
                        // Table exists, directly insert data
                        tx.executeSql(
                            'INSERT INTO Test (Id, Name) VALUES (?, ?)',
                            [1, 'Darko Sovilj'],
                            (_, insertResult) => {
                                console.log('Record inserted successfully');
                            },
                            (_, insertError) => {
                                console.log('Error inserting record: ', insertError);
                            }
                        );
                    }
                },
                (_, error) => {
                    console.log('Error checking table existence: ', error);
                }
            );
        });
    } catch (error) {
        console.error('Error opening database: ', error);
    }
};


export const fillDeviceTable = async () => {
    try {
        console.log('Running SQL command');

        const db = await SQLite.openDatabase({ name: 'AC_inspector.db', location: 'default' });

        db.transaction((tx) => {
            // Table exists, directly insert data
            tx.executeSql(
                'INSERT INTO DeviceType (name) VALUES (?)',
                ['Kühlturm'],
                (_, insertResult) => {
                    console.log('Record inserted successfully');
                },
                (_, insertError) => {
                    console.log('Error inserting record: ', insertError);
                }
            );

        });
    } catch (error) {
        console.error('Error opening database: ', error);
    }
};

export const checkIfTableExists = async (tableName: string): Promise<boolean> => {
    try {
        const db = await SQLite.openDatabase({ name: 'AC_inspector.db', location: 'default' });

        return new Promise<boolean>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
                    [tableName],
                    (_, result) => {
                        const rows = result.rows;
                        resolve(rows.length > 0);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Error opening database: ', error);
        return false;
    }
};

export const selectInsertedRecord = async (table: string) => {
    try {
        const db = await SQLite.openDatabase({ name: 'AC_inspector.db', location: 'default' });

        const tableExists = await checkIfTableExists(table);

        console.log(`${table} Exists: `, tableExists)

        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM ${table}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    if (rows.length > 0) {
                        for (let i = 0; i < rows.length; i++) {
                            const record = rows.item(i);
                            console.log(`Record ${i + 1}:`, record);
                        }
                    } else {
                        console.log('No records found');
                    }
                },
                (_, error) => {
                    console.log('Error selecting record: ', error);
                }
            );
        });
    } catch (error) {
        console.error('Error opening database: ', error);
    }
};

export const deleteAllTables = async (): Promise<void> => {
    try {
        const db = await SQLite.openDatabase({ name: 'AC_inspector.db', location: 'default' });
        const tables = await getAllTables();
        for (const table of tables) {
            if (table === 'android_metadata' || table === 'sqlite_sequence') continue;

            await new Promise<void>((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `DROP TABLE IF EXISTS ${table};`,
                        [],
                        (_, result) => {
                            console.log(`${table} table deleted successfully.`);
                            resolve();
                        },
                        (_, error) => {
                            console.log(`Error deleting ${table} table: `, error);
                            reject(error);
                        }
                    );
                });
            });
        }

    } catch (error) {
        console.error('Error opening database: ', error);
    }
};


export const getAllTables = async () => {
    const db = getDatabase();
    return new Promise<string[]>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'android_%';",
                [],
                (_, result) => {
                    const tables: string[] = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        tables.push(result.rows.item(i).name);
                    }
                    resolve(tables);
                },
                (_, error) => reject(error)
            );
        });
    });
};


export const getAllTables1 = () => {
    const databaseHelper = new DatabaseHelper();
    databaseHelper.getAllTables().then((tables) => {
        console.log('List of tables:', tables);
    });
}











