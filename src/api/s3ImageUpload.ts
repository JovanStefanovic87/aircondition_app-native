import { HETZNER_BUCKET_NAME, HETZNER_S3_ENDPOINT } from './helpers/constants';
import { getAdminApiUrl } from './helpers/functions';

export const uploadImagesToCloudS3 = async (
    imageUris: string[],
    inspectionId: string,
    imageIds: string[],
) => {
    try {
        const adminApiUrl = getAdminApiUrl();
        console.log('adminApiUrl', adminApiUrl);
        if (!adminApiUrl) {
            throw new Error('Admin API URL is not defined');
        }

        if (imageUris.length !== imageIds.length) {
            throw new Error('Number of imageUris must match number of imageIds');
        }

        const formData = new FormData();

        // inspectionId is the same for all files
        formData.append('inspectionId', inspectionId);

        // Append each file + its imageId
        imageUris.forEach((imageUri, index) => {
            const imageId = imageIds[index];
            const fileName = imageUri.split('/').pop();
            const fileExtension = fileName?.split('.').pop() || 'jpg';

            const imageFile = {
                uri: imageUri,
                name: `${imageId}.${fileExtension}`,
                type: `image/${fileExtension}`,
            };

            // Append file
            formData.append('file', imageFile as any);

            // Append matching imageId
            formData.append('imageId', imageId);
        });

        const apiUrl = `${adminApiUrl}/api/s3/images`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response?.ok) {
            const errorText = await response.text();
            throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('Upload successful:', result);
        return result;
    } catch (error) {
        console.error('Error during image upload:', error);
        throw error;
    }
};

export const uploadImagesToS3 = async (
    imageUris: string[],
    inspectionId: string,
    imageIds: string[],
    extensions: string[],
) => {
    const adminApiUrl = getAdminApiUrl();
    const response = await fetch(`${adminApiUrl}/api/upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inspectionId, imageIds, extensions }),
    });

    if (!response.ok) {
        const err = await response.text();
        console.log(`Failed to get upload URLs: ${err}`);
        throw new Error(`Upload-URLs konnten nicht abgerufen werden: ${err}`);
    }

    const presignedUrls = await response.json();

    await Promise.all(
        presignedUrls.map(async ({ id, url }, index) => {
            const uri = imageUris[index];
            const ext = extensions[index];
            const type = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';

            const res = await fetch(uri);
            const blob = await res.blob();

            const putRes = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': type },
                body: blob,
            });

            if (!putRes.ok) {
                console.log(`Upload failed for imageId: ${id}`);
                throw new Error(`Upload für Bild-ID fehlgeschlagen: ${id}`);
            }
        }),
    );

    return presignedUrls.map(({ id, Key }) => ({
        id,
        storagePathS3: `https://${HETZNER_S3_ENDPOINT?.replace(
            /^https?:\/\//,
            '',
        )}/${HETZNER_BUCKET_NAME}/${Key}`,
    }));
};
