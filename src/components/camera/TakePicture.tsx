import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import CameraButton from '../buttons/CameraButton';
import CloseCameraButton from '../buttons/CloseCameraButton';
import ErrorInformationModal from '../modals/ErrorInformationModal';

interface Props {
    onClose: () => void;
    saveImage: (path: string) => void;
}

const TakePicture: React.FC<Props> = ({ onClose, saveImage }) => {
    const cameraRef = useRef(null);
    const device = useCameraDevice('back');
    const [hasPermission, setHasPermission] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto();
            if (photo && photo.path) saveImage('file://' + photo.path);
        }
    };

    useEffect(() => {
        requestCameraPermission();
        return () => {
            if (cameraRef.current) {
                cameraRef.current.release();
            }
        };
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
        device != null &&
        hasPermission && (
            <View style={styles.container}>
                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFillObject}
                    device={device}
                    isActive={true}
                    photo={true}
                />
                <CameraButton onPress={takePicture} />
                <CloseCameraButton onPress={onClose} />
                <ErrorInformationModal
                    visible={errorModalVisible}
                    message={errorMessage}
                    onClose={() => setErrorModalVisible(false)}
                />
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 1,
    },
});

export default TakePicture;
