// src/components/camera/TakePicture.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Modal,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import CameraButton from '../buttons/CameraButton';
import CloseCameraButton from '../buttons/CloseCameraButton';
import PrimaryButton from '../buttons/PrimaryButton';
import { useInspectionStore } from '../../store/store';

interface Props {
    visible: boolean;
    onClose: () => void;
    saveImage: (path: string) => void;
    photoPreview: string | null;
    setPhotoPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const { width, height } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const CAMERA_RATIO = 3 / 4;
const PREVIEW_HEIGHT = screenWidth * CAMERA_RATIO;

const TakePicture: React.FC<Props> = ({
    visible,
    onClose,
    saveImage,
    photoPreview,
    setPhotoPreview,
}) => {
    const cameraRef = useRef<Camera>(null);
    const device = useCameraDevice('back');

    const format = useCameraFormat(device, [{ photoAspectRatio: CAMERA_RATIO }]);

    const { setIsLoading, setLoadingText, setError } = useInspectionStore();

    const [hasPermission, setHasPermission] = useState(false);
    const [torchOn, setTorchOn] = useState(false);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    useEffect(() => {
        if (!visible) {
            setTorchOn(false);
            setPhotoPreview(null);
        }
    }, [visible]);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasPermission(true);
            } else {
                setHasPermission(false);
                setError('Kamerazugriff verweigert.');
            }
        } catch {
            setHasPermission(false);
            setError('Fehler beim Anfordern der Kameraberechtigung.');
        }
    };

    const takePicture = async () => {
        if (!cameraRef.current) return;

        try {
            setIsLoading(true);
            setLoadingText('Foto wird aufgenommen...');

            const photo = await cameraRef.current.takePhoto({
                flash: torchOn ? 'on' : 'off',
            });

            if (photo?.path) {
                setPhotoPreview('file://' + photo.path);
            }
        } catch {
            setError('Fehler beim Fotografieren.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceptPhoto = async () => {
        if (!photoPreview) return;

        try {
            setIsLoading(true);
            setLoadingText('Foto wird gespeichert...');

            const asset = await CameraRoll.saveAsset(photoPreview, {
                album: 'Inspections',
                type: 'photo',
            });

            saveImage(asset.node.image.uri);

            setPhotoPreview(null);
            onClose();
        } catch {
            setError('Fehler beim Speichern des Fotos.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRejectPhoto = () => {
        setPhotoPreview(null);
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            presentationStyle="fullScreen"
            statusBarTranslucent
        >
            {photoPreview ? (
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: photoPreview }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />

                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Speichern" onPress={handleAcceptPhoto} />
                        <PrimaryButton title="Wiederholung" onPress={handleRejectPhoto} />
                    </View>
                </View>
            ) : (
                device &&
                hasPermission && (
                    <View style={styles.cameraWrapper}>
                        <Camera
                            ref={cameraRef}
                            style={StyleSheet.absoluteFill}
                            device={device}
                            format={format}
                            isActive={visible && !photoPreview}
                            photo
                            androidPreviewViewType="texture-view"
                        />

                        <TouchableOpacity
                            onPress={() => setTorchOn((prev) => !prev)}
                            style={styles.flashButton}
                        >
                            <Text style={styles.flashIcon}>⚡</Text>
                            {!torchOn && <View style={styles.flashSlash} />}
                        </TouchableOpacity>
                    </View>
                )
            )}

            {!photoPreview && <CameraButton onPress={takePicture} />}
            <CloseCameraButton onPress={onClose} />
        </Modal>
    );
};

const styles = StyleSheet.create({
    cameraWrapper: {
        flex: 1,
        backgroundColor: '#000',
    },

    camera: {
        flex: 1,
    },

    previewContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: screenWidth,
        height: PREVIEW_HEIGHT,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        position: 'absolute',
        bottom: 30,
    },
    flashButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashIcon: {
        fontSize: 22,
        color: '#fff',
    },
    flashSlash: {
        position: 'absolute',
        width: 28,
        height: 2,
        backgroundColor: '#ff3b30',
        transform: [{ rotate: '-45deg' }],
    },
});

export default TakePicture;
