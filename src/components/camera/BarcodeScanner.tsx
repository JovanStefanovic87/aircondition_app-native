import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import { useCameraDevice, useCodeScanner, Camera } from 'react-native-vision-camera';
import CloseCameraButton from '../buttons/CloseCameraButton';

type BarcodeScannerProps = {
  onClose: () => void;
  width?: number;
  height?: number;
  setScanResult: (result: string) => void;
};

const BarcodeScanner: FC<BarcodeScannerProps> = ({ onClose, width, height, setScanResult }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const [scanning, setScanning] = useState(true);

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'code-128', 'code-93', 'code-39', 'ean-8'],
    onCodeScanned: (codes) => {
      if (scanning) {
        setScanning(false);
        setScanResult(codes[0].value);
        onClose();
      }
    },
  });

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Camera Permission',
        message: 'This app requires camera permission for barcode scanning.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

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
      <>
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
        <CloseCameraButton onPress={onClose} />
      </>
    )
  );
};

export default BarcodeScanner;
