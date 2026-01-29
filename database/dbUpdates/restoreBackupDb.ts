import RNFS from 'react-native-fs';
import {
    databaseFileExists,
    getDatabaseFilePath,
    initDatabase,
} from '../dbConnection/initDatabase';

import { runDBUpdates } from './runUpdates';
import { downloadLatestDb, latestDbExists } from '../../src/api/uploadSqliteBackupToS3';

export const restoreBackupDb = async (username: string) => {
    const localExists = await databaseFileExists();

    if (!localExists) {
        const remoteExists = await latestDbExists(username);

        if (remoteExists) {
            const targetPath = getDatabaseFilePath();
            await downloadLatestDb(username, targetPath);
        }
    }

    await initDatabase();
    await runDBUpdates();
};
