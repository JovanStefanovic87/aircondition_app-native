// databaseHelper.ts

import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

class DatabaseHelper {
    private db: SQLiteDatabase;

    constructor() {
        this.db = SQLite.openDatabase(
            { name: 'AC_inspector.db', location: 'default' },
            () => { },
            (error) => {
                console.error('Error opening database: ', error);
            }
        );
    }

    executeQuery(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    query,
                    params,
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
    }

    getAllTables(): Promise<string[]> {
        const query = "SELECT name FROM sqlite_master WHERE type='table';";
        return this.executeQuery(query).then((result) => {
            const tables: string[] = [];
            for (let i = 0; i < result.rows.length; i++) {
                tables.push(result.rows.item(i).name);
            }
            return tables;
        });
    }
}

export default DatabaseHelper;
