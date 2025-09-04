export const uploadImagesToS3 = async (
    apiBaseUrl: string,
    imageUris: string[],
    inspectionId: string,
    imageIds: string[],
) => {
    try {
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

        const apiUrl = `${apiBaseUrl}/api/s3/images`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
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
