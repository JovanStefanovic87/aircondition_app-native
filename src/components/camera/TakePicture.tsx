import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import CameraButton from '../buttons/CameraButton';

const TakePicture = () => {
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
  }, []);

  const requestCameraPermission = async () => {
    try {
      console.log('Requesting camera permission...');
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
      </View>
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
    height: '100%',
    width: '100%',
  },
});

export default TakePicture;
