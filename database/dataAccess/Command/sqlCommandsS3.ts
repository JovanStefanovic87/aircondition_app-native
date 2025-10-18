import { uploadImagesToS3 } from '../../../src/api/s3ImageUpload';
import { UploadResponse } from '../../types';
import { getAllInspectionImages } from '../Query/sqlQueries';
import { executeUpdateArray } from './baseCommand';

/**
 * syncInspectionImagesToS3 - Function that syncs inspection images to S3 through AC Inspector Admin API
 * @param inspectionId - The ID of the inspection
 */
export const syncInspectionImagesToS3 = async (inspectionId: string) => {
    try {
        const images = await getAllInspectionImages(inspectionId);

        if (!images || images.length === 0) {
            throw new Error(`Keine Bilder für die Inspektions-ID gefunden ${inspectionId}`);
        }

        const imagesToSync = images.filter((img) => !img.storagePathS3);

        if (imagesToSync.length === 0) throw new Error('Nichts zum Synchronisieren');

        const imageUris = imagesToSync.map((img) => img.storagePath);
        const imageIds = imagesToSync.map((img) => img.id);
        const extensions = imagesToSync.map((img) => {
            const parts = img.storagePath.split('.');
            return parts.length > 1 ? parts.pop().toLowerCase() : 'jpg';
        });

        const result = await uploadImagesToS3(imageUris, inspectionId, imageIds, extensions);
        await updateImageStorageWithS3(result);

        return { success: true };
    } catch (error: any) {
        console.log('Error syncing images to S3:', error);
        throw new Error(error?.message || 'Unknown error occurred during sync');
    }
};

export const updateImageStorageWithS3 = async (responses: UploadResponse[]): Promise<void> => {
    const records = responses.map((r) => ({
        id: r.id,
        storagePathS3: r.storagePathS3,
    }));

    if (records.length > 0) {
        await executeUpdateArray('ImageStorage', records);
    }
};
