//src\components\camera\TakePicture.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, PermissionsAndroid, Modal, Dimensions } from 'react-native';
import { Camera, CameraDevice, useCameraDevice } from 'react-native-vision-camera';
import CameraButton from '../buttons/CameraButton';
import CloseCameraButton from '../buttons/CloseCameraButton';
import PrimaryButton from '../buttons/PrimaryButton';
import { useInspectionStore } from '../../store/store';

interface Props {
    visible: boolean;
    onClose: () => void;
    saveImage: (path: string) => void;
    photoPreview: string;
    setPhotoPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const TakePicture: React.FC<Props> = ({
    visible,
    onClose,
    saveImage,
    photoPreview,
    setPhotoPreview,
}) => {
    const cameraRef = useRef<Camera>(null);
    const device = useCameraDevice('back');
    const { setIsLoading, setLoadingText, setError } = useInspectionStore();
    const [hasPermission, setHasPermission] = useState(false);
    const { width } = Dimensions.get('window');

    const takePicture = async () => {
        if (!cameraRef.current) return;
        try {
            setIsLoading(true);
            setLoadingText('Foto wird aufgenommen...');
            const photo = await cameraRef.current.takePhoto();
            if (photo?.path) {
                setPhotoPreview('file://' + photo.path);
            }
        } catch (error: any) {
            console.error('Fehler beim Fotografieren:', error);
            setError('Fehler beim Fotografieren.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceptPhoto = () => {
        if (photoPreview) {
            saveImage(photoPreview);
            setPhotoPreview(null);
        }
    };

    const handleRejectPhoto = () => {
        setPhotoPreview(null);
    };

    const handleCloseCamera = () => {
        onClose();
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app requires camera permission for barcode scanning.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasPermission(true);
            } else {
                setError('Kamerazugriff verweigert.');
                setHasPermission(false);
            }
        } catch (error) {
            setError('Fehler beim Anfordern der Kameraberechtigung.');
            setHasPermission(false);
        }
    };

    return (
        <Modal visible={visible} style={styles.container} animationType="fade">
            {photoPreview ? (
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: photoPreview }}
                        style={{
                            width: width,
                            height: width * (16 / 9),
                        }}
                        resizeMode="cover"
                    />
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Speichern" onPress={handleAcceptPhoto} />
                        <PrimaryButton title="Wiederholung" onPress={handleRejectPhoto} />
                    </View>
                </View>
            ) : (
                device != null &&
                hasPermission && (
                    <Camera
                        ref={cameraRef}
                        style={{
                            width: width,
                            height: width * (16 / 9),
                        }}
                        device={device}
                        isActive={true}
                        photo={true}
                    />
                )
            )}
            {!photoPreview && <CameraButton onPress={takePicture} />}
            <CloseCameraButton onPress={handleCloseCamera} />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 1,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    previewImage: {
        width: '90%',
        height: '70%',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        position: 'absolute',
        bottom: 20,
    },
});

export default TakePicture;
