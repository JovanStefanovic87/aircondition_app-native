import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { HETZNER_BUCKET_NAME, HETZNER_S3_ENDPOINT } from './helpers/constants';
import { getAdminApiUrl } from './helpers/functions';

const DB_NAME = 'app.db';

export const uploadSqliteBackupToS3 = async (username: string) => {
    const adminApiUrl = getAdminApiUrl();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.db`;

    const dbPath =
        Platform.OS === 'android'
            ? `/data/data/${RNFS.MainBundlePath.split('/files')[0]}/databases/${DB_NAME}`
            : `${RNFS.DocumentDirectoryPath}/${DB_NAME}`;

    const tempBackupPath = `${RNFS.DocumentDirectoryPath}/${backupFileName}`;

    const exists = await RNFS.exists(dbPath);
    if (!exists) {
        throw new Error('SQLite database file not found');
    }

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
        const err = await response.text();
        throw new Error(err);
    }

    const { url, Key } = await response.json();

    const fileBuffer = await RNFS.readFile(tempBackupPath, 'base64');

    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        body: Buffer.from(fileBuffer, 'base64') as any,
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
