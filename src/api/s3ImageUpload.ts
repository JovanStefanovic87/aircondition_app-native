import RNFS from 'react-native-fs';

type ImageRecord = {
    id: string; // Will be used as the file name
    path: string; // Full file path from SQLite
};

export async function uploadImagesFromSQLite(records: ImageRecord[]) {
    const formData = new FormData();

    for (const record of records) {
        const fileStat = await RNFS.stat(record.path);
        const fileName = `${record.id}.${getFileExtension(record.path)}`;

        formData.append('file', {
            uri: 'file://' + fileStat.path,
            name: fileName,
            type: getMimeType(fileName),
        } as any);
    }

    const response = await fetch('https://your-domain.com/api/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    });

    const data = await response.json();
    console.log(data);
}

function getFileExtension(path: string): string {
    return path.split('.').pop() || 'jpg';
}

function getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        default:
            return 'application/octet-stream';
    }
}
