import RNFS from 'react-native-fs';
import { HETZNER_BUCKET_NAME, HETZNER_S3_ENDPOINT } from './helpers/constants';
import { getAdminApiUrl } from './helpers/functions';
import { findExistingDbPath, getDatabase } from '../../database/dbConnection/initDatabase';

export const uploadSqliteBackupToS3 = async (username: string) => {
    const adminApiUrl = getAdminApiUrl();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.db`;

    const dbPath = await findExistingDbPath();
    const tempBackupPath = `${RNFS.DocumentDirectoryPath}/${backupFileName}`;

    await getDatabase().executeSql('PRAGMA wal_checkpoint(FULL);');

    await RNFS.copyFile(dbPath, tempBackupPath);

    const response = await fetch(`${adminApiUrl}/api/db-backup-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            fileName: backupFileName,
        }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const { url, Key } = await response.json();

    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        body: {
            uri: `file://${tempBackupPath}`,
            type: 'application/octet-stream',
            name: backupFileName,
        } as any,
    });

    if (!putRes.ok) {
        throw new Error('Database upload failed');
    }

    return {
        storagePathS3: `https://${HETZNER_S3_ENDPOINT?.replace(
            /^https?:\/\//,
            '',
        )}/${HETZNER_BUCKET_NAME}/${Key}`,
    };
};
