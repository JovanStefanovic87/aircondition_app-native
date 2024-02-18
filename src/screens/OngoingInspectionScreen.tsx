import React, { useState, useEffect } from 'react';
import { useInspectionStore } from '../store/store';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmojisContainer from '../components/containers/EmojisContainer';
import EmojisColumnContainer from '../components/containers/EmojisColumnContainer';
import { getInspectionDeviceStateDetails } from '../../database/dataAccess/Query/sqlQueries';
import { launchImageLibrary, MediaType, CameraOptions } from 'react-native-image-picker';
import TakePicture from '../components/camera/TakePicture';
import InspectionTitle from '../components/containers/EmojisGroupTitleContainer';
import PrimaryButton from '../components/buttons/PrimaryButton';

const OngoingInspectionScreen = () => {
  const newInspectionId = useInspectionStore((state) => state.newInspectionId);
  const [inspection, setInspection] = useState(null);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);

  useEffect(() => {
    const fetchInspectionDetails = async () => {
      const result = await getInspectionDeviceStateDetails(newInspectionId);
      setInspection(result);
    };

    fetchInspectionDetails();
  }, [newInspectionId]);

  const toggleCamera = () => {
    setCameraVisible(!isCameraVisible);
  };

  const options: CameraOptions = {
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

  const handleCloseCamera = () => {
    setCameraVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isCameraVisible ? (
        <TakePicture onClose={handleCloseCamera} />
      ) : (
        <GestureHandlerRootView style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              {inspection !== null &&
                inspection.map((group, i) => (
                  <EmojisColumnContainer title={group.groupTypeName} isComplited={true} key={i}>
                    {group.titleComponents.map((title, j) => (
                      <React.Fragment key={j}>
                        <InspectionTitle
                          title={title.name}
                          onPressCamera={toggleCamera}
                          onPressGallery={handleGalleryClick}
                        />
                        <View style={styles.iconsGroupContainer}>
                          {title.deviceStateComponents.map((deviceState) => (
                            <EmojisContainer
                              title={deviceState.name}
                              smileys={deviceState.deviceStateValues}
                              key={deviceState.id}
                            />
                          ))}
                        </View>
                      </React.Fragment>
                    ))}
                  </EmojisColumnContainer>
                ))}
            </View>
          </ScrollView>
          <View style={styles.horizontalLine}></View>
        </GestureHandlerRootView>
      )}
      <View style={styles.rightAlign}>
        <PrimaryButton title="Nächster Schritt" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OngoingInspectionScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
    maxHeight: '90%',
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
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
  rightAlign: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  iconsGroupContainer: {
    gap: 10,
  },
});
