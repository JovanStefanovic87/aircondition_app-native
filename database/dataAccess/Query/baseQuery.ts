import { getDatabase } from "../../dbConnection/initDatabase";
import uuid from 'react-native-uuid';

type QueryResult<T> = {
    rows: {
        length: number;
        item: (index: number) => T;
    };
};

const extractFields = <T extends object>(record: T): T => {
    const extracted: Partial<T> = {};
    Object.keys(record).forEach((key) => {
        if (key in record) {
            extracted[key as keyof T] = record[key as keyof T];
        }
    });
    return extracted as T;
};

type ExecuteQueryOptions<T> = {
    query: string;
    mapper?: (record: T) => T;
};

export const executeQuery = async <T extends object>(
    options: ExecuteQueryOptions<T>
): Promise<T[]> => {
    try {
        const db = getDatabase();

        return new Promise<T[]>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    options.query,
                    [],
                    (_, result: QueryResult<T>) => {
                        const rows = result.rows;
                        const records: T[] = [];

                        if (rows.length > 0) {
                            for (let i = 0; i < rows.length; i++) {
                                const record = rows.item(i);
                                const extracted = options.mapper ? options.mapper(record) : extractFields<T>(record);
                                records.push(extracted);
                            }
                            resolve(records);
                        } else {
                            console.log('No records found');
                            resolve([]);
                        }
                    },
                    (error) => {
                        console.log('Error selecting record: ', error);
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Error opening database: ', error);
        throw error;
    }
};




type DatabaseRecord = {
    id?: number | string;
    [key: string]: any;
};



export const executeUpdateOrInsertWithGuid = async <T extends DatabaseRecord>(
    tableName: string,
    record: Partial<T>
): Promise<string | void> => {
    try {
        const db = getDatabase();

        return new Promise<string | void>((resolve, reject) => {
            db.transaction((tx) => {
                console.log('record', record)
                if (record.id) {
                    // If record has an ID, update existing record
                    const keys = Object.keys(record).filter((key) => key !== 'id');
                    const values = Object.values(record).filter((value) => value !== undefined && value !== null);
                    const placeholders = keys.map((_, index) => `${keys[index]} = ?`).join(',');

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
                        }
                    );
                } else {
                    console.log('Inserting new record: ', record)
                    // If record does not have an ID, insert new record with generated UUID
                    const id = uuid.v4(); // Generate UUID
                    console.log('id-uuid', id)
                    const keys = Object.keys(record);
                    const values = Object.values(record).filter((value) => value !== undefined && value !== null);
                    const placeholders = keys.map(() => '?').join(',');

                    tx.executeSql(
                        `INSERT INTO ${tableName} (id, ${keys.join(',')}) VALUES (?, ${placeholders})`,
                        [id, ...values],
                        () => {
                            console.log('Record inserted successfully');
                            resolve(id as string); // Return generated UUID
                        },
                        (error) => {
                            console.log('Error inserting record: ', error);
                            reject(error);
                        }
                    );
                }
            });
        });
    } catch (error) {
        console.error('Error opening database: ', error);
        throw error;
    }
};



