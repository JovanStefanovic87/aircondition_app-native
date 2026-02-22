import { uploadImagesToS3 } from '../../../src/api/s3ImageUpload';
import { HETZNER_BUCKET_NAME } from '../../../src/api/helpers/constants';
import { getAdminApiUrl } from '../../../src/api/helpers/functions';
import { getStoredUser, handleUnauthorized } from '../Helper/auth';
import { UploadResponse } from '../../types';
import { getAllInspectionImages } from '../Query/sqlQueries';
import { executeDeleteByConditions, executeDeleteById, executeUpdateArray } from './baseCommand';

/**
 * syncInspectionImagesToS3 - Function that syncs inspection images to S3 through AC Inspector Admin API.
 * Uploads images missing an S3 path, and deletes images marked as deleted but not yet removed from S3.
 * @param inspectionId - The ID of the inspection
 */
export const syncInspectionImagesToS3 = async (inspectionId: string) => {
    try {
        const images = await getAllInspectionImages(inspectionId);

        if (!images || images.length === 0) {
            return { success: true };
        }

        // --- Upload ---
        const imagesToSync = images.filter((img) => !img.storagePathS3 && !img.isDeleted);

        console.log(`Found ${imagesToSync.length} images to upload for inspection ${inspectionId}`);

        if (imagesToSync.length > 0) {
            const imageUris = imagesToSync.map((img) => img.storagePath);
            const imageIds = imagesToSync.map((img) => img.id);
            const extensions = imagesToSync.map((img) => {
                const parts = img.storagePath.split('.');
                return parts.length > 1 ? parts.pop().toLowerCase() : 'jpg';
            });

            const result = await uploadImagesToS3(imageUris, inspectionId, imageIds, extensions);
            await updateImageStorageWithS3(result);
        }

        // --- Delete from S3 ---
        const imagesToDelete = images.filter(
            (img) => img.isDeleted === 1 && img.isDeletedS3 === 0 && img.storagePathS3,
        );

        console.log(
            `Found ${imagesToDelete.length} images to delete from S3 for inspection ${inspectionId}`,
        );

        if (imagesToDelete.length > 0) {
            await deleteImagesFromS3(imagesToDelete);
        }

        return { success: true };
    } catch (error: any) {
        console.log('Error syncing images to S3:', error);
        throw new Error(error?.message || 'Unknown error occurred during sync');
    }
};

/**
 * deleteImagesFromS3 - Calls the bulk-delete API for images marked as deleted,
 * then updates isDeletedS3=1 for each successfully removed image.
 */
const deleteImagesFromS3 = async (
    images: Array<{ id: string; storagePathS3?: string }>,
): Promise<void> => {
    const adminApiUrl = getAdminApiUrl();
    const user = await getStoredUser();
    if (!user) throw new Error('No active session');
    // Extract the S3 object key from the full URL: everything after /<bucket>/
    const bucketPrefix = `/${HETZNER_BUCKET_NAME}/`;
    const keyById = new Map<string, string>();

    for (const img of images) {
        const idx = img.storagePathS3!.indexOf(bucketPrefix);
        const key = idx !== -1 ? img.storagePathS3!.slice(idx + bucketPrefix.length) : null;
        if (key) keyById.set(img.id, key);
    }

    if (keyById.size === 0) return;

    const response = await fetch(`${adminApiUrl}/api/s3/images/bulk-delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ keys: Array.from(keyById.values()) }),
    });
    console.log('S3 bulk-delete response status:', response.status);

    if (response.status === 401) {
        await handleUnauthorized();
        throw new Error('Session expired');
    }
    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Bulk delete failed: ${err}`);
    }

    const { deleted, errors } = await response.json();

    if (errors?.length) {
        console.log('S3 bulk-delete partial errors:', errors);
    }

    // Build a set of successfully deleted keys
    const deletedKeys = new Set<string>((deleted ?? []).map((d: { Key: string }) => d.Key));

    console.log(`Deleted from S3: ${deletedKeys.size}, Failed: ${errors?.length || 0}`);

    // Clean up all successfully deleted images from junction tables and ImageStorage
    const successfullyDeleted = images.filter((img) => {
        const key = keyById.get(img.id);
        return key && deletedKeys.has(key);
    });

    const junctionTables = [
        'Inspection_Image',
        'Inspection_Title_Group_Image',
        'Inspection_Element_Image',
        'Inspection_Element_Title_Group_Image',
        'InspectionQuestion_Image',
        'DeviceElement_Image',
    ];

    for (const img of successfullyDeleted) {
        for (const table of junctionTables) {
            await executeDeleteByConditions(table, { imageId: img.id });
        }
        await executeDeleteById('ImageStorage', img.id);
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
