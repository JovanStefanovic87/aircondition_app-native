import React, { FC, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, PermissionsAndroid, BackHandler, Text } from 'react-native';
import { useCameraDevice, useCodeScanner, Camera } from 'react-native-vision-camera';
import CloseCameraButton from '../buttons/CloseCameraButton';
import ErrorBoundary from '../errors/ErrorBoundary';

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
    const [scanning, setScanning] = useState(true);
    const device = useCameraDevice('back');

    useEffect(() => {
        if (isScannerOpen) {
            requestCameraPermission();
        }
    }, []);

    useEffect(() => {
        const backPressHandler = () => {
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', backPressHandler);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
        };
    }, []);

    useEffect(() => {
        if (!scanning) {
            setScannerOpen(false);
        }
    }, [scanning, setScannerOpen]);

    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13', 'code-128', 'code-93', 'code-39', 'ean-8'],
        onCodeScanned: (codes) => {
            if (scanning) {
                setScanResult(codes[0].value);
                setScanning(false);
            }
        },
    });

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

    if (!isScannerOpen || !hasPermission || !device) {
        return <Text>Camera error</Text>;
    }

    return (
        <ErrorBoundary>
            <Camera
                style={StyleSheet.absoluteFillObject}
                device={device}
                isActive={scanning}
                codeScanner={codeScanner}
                enableZoomGesture={true}
            />
            <View
                style={{
                    width: width ?? 300,
                    height: height ?? 300,
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    borderWidth: 2,
                }}
            />
            <CloseCameraButton onPress={() => setScanning(false)} />
        </ErrorBoundary>
    );
};

export default BarcodeScanner;
