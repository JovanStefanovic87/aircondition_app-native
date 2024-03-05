import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import CameraButton from '../buttons/CameraButton';
import CloseCameraButton from '../buttons/CloseCameraButton';

interface Props {
    onClose: () => void;
}

const TakePicture: React.FC<Props> = ({ onClose }) => {
    const cameraRef = useRef(null);
    const device = useCameraDevice('back');
    const [hasPermission, setHasPermission] = useState(false);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto();
            console.log('Photo taken:', photo);
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
        } catch (err) {
            console.warn('Error requesting camera permission:', err);
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
