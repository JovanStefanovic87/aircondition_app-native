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
import TakePicture from '../camera/TakePicture'; // ✅ import tvoje kamere

interface Props {
    inspectionDeviceElementId: string;
}

const ElementImagesSection: React.FC<Props> = ({ inspectionDeviceElementId }) => {
    const [images, setImages] = useState<ImageGallery[]>([]);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false); // ✅ modal kontrola
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const fetchImages = async () => {
        const result = await getInspectionElementImages(inspectionDeviceElementId);
        if (result) {
            setImages(
                result.map((img) => ({
                    imageId: img.id,
                    imagePath: img.storagePath,
                    imageType: IMAGE_TYPES.DeviceElement_Image as ImageTypesByDbTable,
                })),
            );
        }
    };

    useEffect(() => {
        fetchImages();
    }, [inspectionDeviceElementId]);

    const handleUpload = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.assets && result.assets[0]) {
            const record = {
                storagePath: result.assets[0].uri!,
                name: IMAGE_TYPES.DeviceElement_Image as ImageTypesByDbTable,
            };
            await saveInspectionDeviceElementImage(inspectionDeviceElementId, record);
            await fetchImages();
        }
    };

    // ✅ kada se prihvati fotka iz TakePicture
    const handleSaveFromCamera = async (path: string) => {
        const record = {
            storagePath: path,
            name: IMAGE_TYPES.DeviceElement_Image as ImageTypesByDbTable,
        };
        await saveInspectionDeviceElementImage(inspectionDeviceElementId, record);
        await fetchImages();
        setCameraVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bilder des Elements</Text>
            <View style={styles.row}>
                <IconButton icon="camera" onPress={() => setCameraVisible(true)} />
                <IconButton icon="upload" onPress={handleUpload} />
                <IconButton icon="image" onPress={() => setGalleryVisible(true)} />
            </View>

            <GalleryModal
                visible={isGalleryVisible}
                images={images}
                title="Bilder des Elements"
                onClose={() => setGalleryVisible(false)}
                setGalleryImages={setImages}
            />

            {/* ✅ koristi tvoju custom kameru */}
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        marginTop: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: customColors.black,
    },
});

export default ElementImagesSection;
