import React, { FC, Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    PermissionsAndroid,
    BackHandler,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useCameraDevice, useCodeScanner, Camera } from 'react-native-vision-camera';
import CloseCameraButton from '../buttons/CloseCameraButton';
import ErrorBoundary from '../errors/ErrorBoundary';
import ErrorInformationModal from '../modals/ErrorInformationModal';

type Props = {
    width?: number;
    height?: number;
    setScanResult: (result: string) => void;
    isScannerOpen: boolean;
    setScannerOpen: Dispatch<SetStateAction<boolean>>;
};

const BarcodeScanner: FC<Props> = ({
    width,
    height,
    setScanResult,
    isScannerOpen,
    setScannerOpen,
}) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [currentCode, setCurrentCode] = useState<string | null>(null);

    const device = useCameraDevice('back');

    useEffect(() => {
        if (isScannerOpen) {
            requestCameraPermission();
        }
    }, [isScannerOpen]);

    useEffect(() => {
        const backPressHandler = () => true;
        BackHandler.addEventListener('hardwareBackPress', backPressHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
    }, []);

    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13', 'code-128', 'code-93', 'code-39', 'ean-8'],
        onCodeScanned: (codes) => {
            const value = codes[0]?.value;
            if (value) {
                setCurrentCode(value);
            }
        },
    });

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (error: any) {
            setErrorMessage(error.message);
            setErrorModalVisible(true);
        }
    };

    if (!isScannerOpen || !hasPermission || !device) {
        return <Text>Kamerafehler</Text>;
    }

    return (
        <ErrorBoundary>
            <Camera
                style={StyleSheet.absoluteFillObject}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
                enableZoomGesture
            />

            {/* Scan frame */}
            <View
                style={{
                    width: width ?? 300,
                    height: height ?? 300,
                    borderColor: 'white',
                    borderWidth: 2,
                    alignSelf: 'center',
                    marginTop: 80,
                }}
            />

            {/* Detected codes */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 120,
                    left: 20,
                    right: 20,
                    alignItems: 'center',
                }}
            >
                {!currentCode ? (
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            paddingVertical: 14,
                            paddingHorizontal: 20,
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ color: 'white' }}>Richte die Kamera auf den Barcode</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setScanResult(currentCode);
                            setScannerOpen(false);
                        }}
                        style={{
                            backgroundColor: '#00ffcc',
                            paddingVertical: 16,
                            paddingHorizontal: 24,
                            borderRadius: 12,
                            minWidth: '80%',
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            {currentCode}
                        </Text>
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 12,
                                textAlign: 'center',
                                marginTop: 4,
                            }}
                        >
                            Antippen zum Speichern
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <CloseCameraButton onPress={() => setScannerOpen(false)} />

            <ErrorInformationModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
        </ErrorBoundary>
    );
};

export default BarcodeScanner;
