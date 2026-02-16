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
        body: JSON.stringify({ username, fileName: backupFileName }),
    });

    console.log('Backup URL response status:', response);

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const { timestamp: ts, latest } = await response.json();

    const upload = async (url: string) => {
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/octet-stream' },
            body: {
                uri: `file://${tempBackupPath}`,
                type: 'application/octet-stream',
                name: backupFileName,
            } as any,
        });

        if (!res.ok) {
            throw new Error('Database upload failed');
        }
    };

    await Promise.all([upload(ts.url), upload(latest.url)]);

    return {
        latestDbUrl: `https://${HETZNER_S3_ENDPOINT!.replace(
            /^https?:\/\//,
            '',
        )}/${HETZNER_BUCKET_NAME}/${latest.Key}`,
        timestampedDbUrl: `https://${HETZNER_S3_ENDPOINT!.replace(
            /^https?:\/\//,
            '',
        )}/${HETZNER_BUCKET_NAME}/${ts.Key}`,
    };
};

const baseUrl = `https://${HETZNER_S3_ENDPOINT!.replace(
    /^https?:\/\//,
    '',
)}/${HETZNER_BUCKET_NAME}`;

export const backupDbExists = async (username: string) => {
    const adminApiUrl = getAdminApiUrl();
    const res = await fetch(`${adminApiUrl}/api/db-backup-download-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });
    return res.ok;
};

export const downloadLatestDb = async (username: string, targetPath: string) => {
    const adminApiUrl = getAdminApiUrl();
    const tmpPath = `${RNFS.DocumentDirectoryPath}/latest.db`;

    const res = await fetch(`${adminApiUrl}/api/db-backup-download-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });

    if (!res.ok) {
        throw new Error('Failed to get download URL');
    }

    const { url } = await res.json();

    await RNFS.downloadFile({
        fromUrl: url,
        toFile: tmpPath,
    }).promise;

    await RNFS.moveFile(tmpPath, targetPath);
};
