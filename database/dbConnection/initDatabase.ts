import SQLite from 'react-native-sqlite-storage';

let database: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
    try {
        if (!database) {
            database = await SQLite.openDatabase({ name: 'AC_inspector.db', location: 'default' });
        }
    } catch (error) {
        console.error('Error opening database: ', error);
        throw error;
    }
};

export const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};