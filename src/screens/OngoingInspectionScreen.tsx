import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmojisContainer from '../components/containers/EmojisContainer';
import EmojisColumnContainer from '../components/containers/EmojisColumnContainer';
import IconButton from '../components/buttons/IconButton';
import TakePicture from '../components/camera/TakePicture';

const OngoingInspectionScreen = () => {
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);

  const toggleCamera = () => {
    setCameraVisible(!isCameraVisible);
  };

  const options: ImageLibraryOptions = {
    mediaType: 'photo' as MediaType,
    presentationStyle: 'fullScreen',
  };

  const handleGalleryClick = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          const source = { uri: selectedImage.uri };
          setAvatarSource(source);
        }
      }
    });
  };

  return (
    <View>
      {isCameraVisible ? (
        <TakePicture />
      ) : (
        <GestureHandlerRootView style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <EmojisColumnContainer title="ANLAGE" isComplited={true}>
                <View style={styles.iconsContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.elementName}>ANLAGE</Text>
                    <View style={styles.cameraIconsContainer}>
                      <IconButton icon="camera" onPress={toggleCamera} />
                      <IconButton icon="image" onPress={handleGalleryClick} />
                    </View>
                  </View>
                </View>
                <View style={styles.emojisGroupContainer}>
                  <EmojisContainer title="Analge" green red yellow orange />
                  <EmojisContainer title="Analge1" green red yellow orange />
                  <EmojisContainer title="Analge2" green red yellow orange />
                </View>
              </EmojisColumnContainer>
              <EmojisColumnContainer title="ANLAGE" isComplited={true}>
                <View style={styles.iconsContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.elementName}>ANLAGE</Text>
                    <View style={styles.cameraIconsContainer}>
                      <IconButton icon="camera" onPress={toggleCamera} />
                      <IconButton icon="image" onPress={handleGalleryClick} />
                    </View>
                  </View>
                </View>
                <View style={styles.emojisGroupContainer}>
                  <EmojisContainer title="Analge" green red yellow orange />
                  <EmojisContainer title="Analge" green red yellow orange />
                  <EmojisContainer title="Analge" green red yellow orange />
                </View>
              </EmojisColumnContainer>
            </View>
          </ScrollView>
          <View style={styles.horizontalLine}></View>
        </GestureHandlerRootView>
      )}
    </View>
  );
};

export default OngoingInspectionScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
    maxHeight: '92%',
  },
  scrollView: {
    width: '100%',
    height: '100%',
    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: 'transparent',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    paddingBottom: 30,
  },
  iconsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  emojisGroupContainer: {
    flex: 1,
    gap: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
  },
  elementName: {
    flex: 1,
    minWidth: '60%',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  cameraIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    maxWidth: '40%',
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
});
