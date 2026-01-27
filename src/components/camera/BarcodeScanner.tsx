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
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCameraFormat } from 'react-native-vision-camera';

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
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const frameSize = Math.min(screenWidth, screenHeight) * 0.7;
    const navigation = useNavigation();

    const device = useCameraDevice('back');

    useEffect(() => {
        navigation.setOptions({ headerShown: false });

        const backPressHandler = () => true;
        BackHandler.addEventListener('hardwareBackPress', backPressHandler);

        return () => {
            navigation.setOptions({ headerShown: true });
            BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
        };
    }, []);

    useEffect(() => {
        if (isScannerOpen) {
            requestCameraPermission();
        }
    }, [isScannerOpen]);

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

    const frameTop = (screenHeight - frameSize) / 2;

    const isLandscape = screenWidth > screenHeight;

    const format = useCameraFormat(device, [{ videoAspectRatio: 4 / 3 }]);

    const buttonStyle = isLandscape
        ? {
              bottom: 32,
              left: 20,
              right: 20,
          }
        : {
              top: frameTop + frameSize + 24,
              left: 20,
              right: 20,
          };

    if (!isScannerOpen || !hasPermission || !device) {
        return <Text>Kamerafehler</Text>;
    }

    return (
        <ErrorBoundary>
            <View style={StyleSheet.absoluteFill}>
                <Camera
                    device={device}
                    format={format}
                    isActive
                    codeScanner={codeScanner}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                />
            </View>

            {/* Scan frame */}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: frameSize,
                        height: frameSize,
                        borderColor: 'white',
                        borderWidth: 2,
                    }}
                />
            </View>

            {/* Detected codes */}
            <View
                style={[
                    {
                        position: 'absolute',
                        alignItems: 'center',
                    },
                    buttonStyle,
                ]}
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
