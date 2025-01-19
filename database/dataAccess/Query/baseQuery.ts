import { getDatabase } from '../../dbConnection/initDatabase';
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

const maxRetries = 3;
const retryDelay = 500;

export const executeQuery = async <T extends object>(
    options: ExecuteQueryOptions<T>,
): Promise<T[]> => {
    let attempt = 1;

    while (attempt <= maxRetries) {
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
                                    const extracted = options.mapper
                                        ? options.mapper(record)
                                        : extractFields<T>(record);
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
                        },
                    );
                });
            });
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        attempt++;
    }
};

export const executeQuerySingle = async <T extends object>(
    options: ExecuteQueryOptions<T>,
): Promise<T | null> => {
    let attempt = 1;

    while (attempt <= maxRetries) {
        try {
            const db = getDatabase();

            return new Promise<T | null>((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        options.query,
                        [],
                        (_, result: QueryResult<T>) => {
                            const rows = result.rows;

                            if (rows.length > 0) {
                                const record = rows.item(0);
                                const extracted = options.mapper
                                    ? options.mapper(record)
                                    : extractFields<T>(record);
                                resolve(extracted);
                            } else {
                                console.log('No record found');
                                resolve(null);
                            }
                        },
                        (error) => {
                            console.log('Error selecting record: ', error);
                            reject(error);
                        },
                    );
                });
            });
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        attempt++;
    }
};

/**
 * Function same as executeQuerySingle but with a return type of string or number
 * @param query - SQL query to execute
 * @returns single value of type string or number
 */

export const executeQuerySimple = async <T extends string | number>(
    query: string,
): Promise<T | null> => {
    let attempt = 1;

    while (attempt <= maxRetries) {
        try {
            const db = getDatabase();

            return new Promise<T | null>((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        query,
                        [],
                        (_, result) => {
                            const rows = result.rows;

                            if (rows.length > 0) {
                                const record = rows.item(0);
                                const firstValue = Object.values(record)[0] as T;
                                resolve(firstValue);
                            } else {
                                console.log('No record found');
                                resolve(null);
                            }
                        },
                        (error) => {
                            console.log('Error selecting record: ', error);
                            reject(error);
                        },
                    );
                });
            });
        } catch (error) {
            console.log('Query attempt failed, retrying...', error);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        attempt++;
    }

    console.log('Max retries reached. Query failed.');
    return null;
};
