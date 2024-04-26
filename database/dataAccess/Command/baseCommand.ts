import { getDatabase } from '../../dbConnection/initDatabase';
import uuid from 'react-native-uuid';

type DatabaseRecord = {
    id?: number | string;
    [key: string]: any;
};

export const executeUpdateOrInsertWithGuid = async <T extends DatabaseRecord>(
    tableName: string,
    record: Partial<T>,
): Promise<string | void> => {
    try {
        const db = getDatabase();

        return new Promise<string | void>((resolve, reject) => {
            db.transaction((tx) => {
                if (record.id) {
                    // If record has an ID, update existing record
                    const keys = Object.keys(record).filter((key) => key !== 'id');
                    const allValues = Object.values(record).filter((value) => value !== undefined);
                    const placeholders = keys.map((_, index) => `${keys[index]} = ?`).join(',');
                    const values = allValues.filter((value) => value !== record.id);

                    tx.executeSql(
                        `UPDATE ${tableName} SET ${placeholders} WHERE id = ?`,
                        [...values, record.id],
                        () => {
                            resolve();
                        },
                        (error) => {
                            console.log('Error updating record: ', error);
                            reject(error);
                        },
                    );
                } else {
                    // Insert new record
                    const id = uuid.v4(); // Generate UUID
                    const keys = Object.keys(record);
                    const values = Object.values(record).filter((value) => value !== undefined);
                    const placeholders = keys.map(() => '?').join(',');

                    tx.executeSql(
                        `INSERT INTO ${tableName} (id, ${keys.join(
                            ',',
                        )}) VALUES (?, ${placeholders})`,
                        [id, ...values],
                        () => {
                            resolve(id as string); // Return generated UUID
                        },
                        (error) => {
                            console.log('Error inserting record: ', error);
                            reject(error);
                        },
                    );
                }
            });
        });
    } catch (error) {
        console.error('Error opening database: ', error);
        // TODO: LOG ERROR
        // throw error;
    }
};

export const executeUpdate = async <T extends DatabaseRecord>(
    tableName: string,
    record: Partial<T>,
): Promise<string | void> => {
    try {
        const db = getDatabase();

        return new Promise<string | void>((resolve, reject) => {
            db.transaction((tx) => {
                if (record.id) {
                    // If record has an ID, update existing record
                    const keys = Object.keys(record).filter((key) => key !== 'id');
                    const allValues = Object.values(record).filter((value) => value !== undefined);
                    const placeholders = keys.map((_, index) => `${keys[index]} = ?`).join(',');
                    const values = allValues.filter((value) => value !== record.id);

                    tx.executeSql(
                        `UPDATE ${tableName} SET ${placeholders} WHERE id = ?`,
                        [...values, record.id],
                        () => {
                            console.log('Record updated successfully');
                            resolve();
                        },
                        (error) => {
                            console.log('Error updating record: ', error);
                            reject(error);
                        },
                    );
                }
            });
        });
    } catch (error) {
        console.error('Error opening database: ', error);
        // TODO: LOG ERROR
        // throw error;
    }
};

export const executeInsertWithGuid = async <T extends DatabaseRecord>(
    tableName: string,
    record: Partial<T>,
): Promise<string | void> => {
    try {
        const db = getDatabase();

        return new Promise<string | void>((resolve, reject) => {
            db.transaction((tx) => {
                const id = uuid.v4(); // Generate UUID
                const keys = Object.keys(record);
                const values = Object.values(record).filter((value) => value !== undefined);
                const placeholders = keys.map(() => '?').join(',');

                console.log('Inserting record: ', placeholders);

                tx.executeSql(
                    `INSERT INTO ${tableName} (id, ${keys.join(',')}) VALUES (?, ${placeholders})`,
                    [id, ...values],
                    () => {
                        resolve(id as string); // Return generated UUID
                    },
                    (error) => {
                        console.log('Error inserting record: ', error);
                        reject(error);
                    },
                );
            });
        });
    } catch (error) {
        console.error('Error opening database: ', error);
        // TODO: LOG ERROR
        // throw error;
    }
};

export const executeDeleteById = async (tableName: string, id: number | string) => {
    try {
        const db = getDatabase();

        return new Promise<void>((resolve, reject) => {
            db.transaction((tx) => {
                const sql = `DELETE FROM ${tableName} WHERE id = ?`;

                tx.executeSql(
                    sql,
                    [id],
                    () => {
                        console.log('Record deleted successfully');
                        resolve();
                    },
                    (error) => {
                        console.error('Error deleting record: ', error);
                        reject(error);
                    },
                );
            });
        });
    } catch (error) {
        console.error('Error opening database: ', error);
        // TODO: LOG ERROR
        // throw error;
    }
};
