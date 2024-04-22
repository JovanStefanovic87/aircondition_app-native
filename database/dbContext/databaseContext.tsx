import React, { createContext, useState, useEffect } from 'react';
import { initDatabase } from '../dbConnection/initDatabase';

const DatabaseContext = createContext({
    database: null,
});

const DatabaseProvider = ({ children }) => {
    const [database, setDatabase] = useState(null);

    useEffect(() => {
        const initializeDb = async () => {
            try {
                const db = await initDatabase();
                setDatabase(db);
            } catch (error) {
                console.error('Error initializing database:', error);
            }
        };

        initializeDb();
    }, []);

    return <DatabaseContext.Provider value={{ database }}>{children}</DatabaseContext.Provider>;
};

export { DatabaseContext, DatabaseProvider };
