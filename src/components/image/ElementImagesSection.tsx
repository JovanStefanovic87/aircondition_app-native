// src/components/image/ElementImagesSection.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import GalleryModal from '../modals/GalleryModal';
import { saveInspectionDeviceElementImage } from '../../../database/dataAccess/Command/sqlCommands';
import { getInspectionElementImages } from '../../../database/dataAccess/Query/sqlQueries';
import { ImageGallery, ImageTypesByDbTable } from '../../../database/types';
import { IMAGE_TYPES } from '../../helpers/constants';
import { customColors } from '../../assets/styles/customStyles';
import IconButton from '../buttons/IconButton';
import TakePicture from '../camera/TakePicture';

interface Props {
    inspectionDeviceElementId: string;
    onImagesChange?: (hasImages: boolean) => void;
}

const ElementImagesSection: React.FC<Props> = ({ inspectionDeviceElementId, onImagesChange }) => {
    const [images, setImages] = useState<ImageGallery[]>([]);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const hasImages = images.length > 0;

    const fetchImages = async () => {
        const result = await getInspectionElementImages(inspectionDeviceElementId);
        console.log('Fetched element images:', result);

        const mapped: ImageGallery[] = result
            ? result.map((img) => ({
                  imageId: img.id,
                  imagePath: img.storagePath,
                  imageType: IMAGE_TYPES.Inspection_Element_Image as ImageTypesByDbTable,
              }))
            : [];

        setImages(mapped);
        onImagesChange?.(mapped.length > 0);
    };

    useEffect(() => {
        fetchImages();
    }, [inspectionDeviceElementId]);

    const handleUpload = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 0, // ✅ multi-select
        });

        if (!result.assets?.length) return;

        for (const asset of result.assets) {
            if (!asset.uri) continue;

            await saveInspectionDeviceElementImage(inspectionDeviceElementId, {
                storagePath: asset.uri,
                name: IMAGE_TYPES.DeviceElement_Image as ImageTypesByDbTable,
            });
        }

        await fetchImages();
    };

    const handleSaveFromCamera = async (path: string) => {
        await saveInspectionDeviceElementImage(inspectionDeviceElementId, {
            storagePath: path,
            name: IMAGE_TYPES.Inspection_Element_Image as ImageTypesByDbTable,
        });

        setCameraVisible(false);
        await fetchImages();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bilder des Elements</Text>

            <View style={styles.row}>
                <IconButton icon="camera" onPress={() => setCameraVisible(true)} />
                <IconButton icon="upload" onPress={handleUpload} />
                <IconButton
                    icon="image"
                    onPress={() => setGalleryVisible(true)}
                    isRequired={hasImages}
                />
            </View>

            <GalleryModal
                visible={isGalleryVisible}
                images={images}
                title="Bilder des Elements"
                onClose={() => setGalleryVisible(false)}
                setGalleryImages={setImages}
            />

            <TakePicture
                visible={cameraVisible}
                onClose={() => setCameraVisible(false)}
                saveImage={handleSaveFromCamera}
                photoPreview={photoPreview}
                setPhotoPreview={setPhotoPreview}
            />
        </View>
    );
};

export default ElementImagesSection;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: customColors.black,
    },
});
