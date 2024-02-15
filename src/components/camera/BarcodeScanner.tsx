import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {
  useCameraDevice,
  useCodeScanner,
  Code,
  Camera,
} from 'react-native-vision-camera';

type BarcodeScannerProps = {
  onClose: () => void;
  width?: number;
  height?: number;
  setScanResult: Dispatch<SetStateAction<string>>;
};

const BarcodeScanner: FC<BarcodeScannerProps> = ({
  onClose,
  width,
  height,
  setScanResult,
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const [barcode, setBarcode] = useState<Code[]>([]);
  const [scanning, setScanning] = useState(true);

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'code-128', 'code-93', 'code-39', 'ean-8'],
    onCodeScanned: (codes) => {
      if (scanning) {
        setBarcode(codes);
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
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </>
    )
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default BarcodeScanner;
