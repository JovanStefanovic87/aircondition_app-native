import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import CameraButton from '../buttons/CameraButton';
import CloseCameraButton from '../buttons/CloseCameraButton';
import PrimaryButton from '../buttons/PrimaryButton';
import ErrorInformationModal from '../modals/ErrorInformationModal';

interface Props {
    onClose: () => void;
    saveImage: (path: string) => void;
}

const TakePicture: React.FC<Props> = ({ onClose, saveImage }) => {
    const cameraRef = useRef<Camera>(null);
    const device = useCameraDevice('back');
    const [hasPermission, setHasPermission] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto();
                console.log('Photo:', photo);
                if (photo && photo.path) {
                    setPhotoPreview('file://' + photo.path);
                }
            } catch (error) {
                console.error('Error taking photo:', error);
            }
        }
    };

    const handleAcceptPhoto = () => {
        if (photoPreview) {
            saveImage(photoPreview);
            setPhotoPreview(null); // Resetuje preview i omogućava dalje slikanje
        }
    };

    const handleRejectPhoto = () => {
        setPhotoPreview(null); // Resetuje preview i omogućava dalje slikanje
    };

    const handleCloseCamera = () => {
        onClose(); // Neposredno zatvori kameru
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
                setHasPermission(false);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setErrorModalVisible(true);
            setHasPermission(false);
        }
    };

    return (
        <View style={styles.container}>
            {photoPreview ? (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: photoPreview }} style={styles.previewImage} />
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Save" onPress={handleAcceptPhoto} />
                        <PrimaryButton title="Retake" onPress={handleRejectPhoto} />
                    </View>
                </View>
            ) : (
                device != null &&
                hasPermission && (
                    <Camera
                        ref={cameraRef}
                        style={StyleSheet.absoluteFillObject}
                        device={device}
                        isActive={true} // Kamera uvek aktivna dok ne izađemo
                        photo={true}
                    />
                )
            )}
            {!photoPreview && <CameraButton onPress={takePicture} />}
            <CloseCameraButton onPress={handleCloseCamera} />
            <ErrorInformationModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
        </View>
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
    },
});

export default TakePicture;
