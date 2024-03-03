import React, { useState, useEffect } from 'react';
import { useInspectionStore } from '../store/store';
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmojisContainer from '../components/containers/EmojisContainer';
import EmojisColumnContainer from '../components/containers/EmojisColumnContainer';
import { getInspectionDeviceStateDetails } from '../../database/dataAccess/Query/sqlQueries';
import { saveInspectionDeviceState } from '../../database/dataAccess/Query/sqlCommands';
import { launchImageLibrary, MediaType, CameraOptions } from 'react-native-image-picker';
import TakePicture from '../components/camera/TakePicture';
import InspectionTitle from '../components/containers/EmojisGroupTitleContainer';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { DeviceStateComponent } from '../../database/types';

const InspectionDeviceStateScreen = () => {
    const newInspectionId = useInspectionStore((state) => state.inspectionId);
    const [inspection, setInspection] = useState(null);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [avatarSource, setAvatarSource] = useState(null);

    const screenWidth = Dimensions.get('window').width;
    const width = screenWidth < 600 ? '100%' : '48%';

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

    const isIspectionFormCompleted = (titleComponents: any[]) => {
        return titleComponents.every((title) =>
            title.deviceStateComponents.every(
                (deviceStateComponent: DeviceStateComponent) => deviceStateComponent.value !== null,
            ),
        );
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
                        <View style={styles.rowContainer}>
                            {inspection !== null &&
                                inspection.map((group, i) => (
                                    <React.Fragment key={i}>
                                        {group.titleComponents.map((title, j) => (
                                            <View
                                                key={j}
                                                style={[styles.columnContainer, { width }]}
                                            >
                                                <EmojisColumnContainer
                                                    title={group.groupTypeName}
                                                    isComplited={isIspectionFormCompleted(
                                                        group.titleComponents,
                                                    )}
                                                >
                                                    <InspectionTitle
                                                        title={title.name}
                                                        onPressCamera={toggleCamera}
                                                        onPressGallery={handleGalleryClick}
                                                    />
                                                    <View style={styles.iconsGroupContainer}>
                                                        {title.deviceStateComponents.map(
                                                            (deviceState: DeviceStateComponent) => (
                                                                <EmojisContainer
                                                                    deviceState={deviceState}
                                                                    saveInspectionDeviceState={
                                                                        saveInspectionDeviceState
                                                                    }
                                                                    key={deviceState.id}
                                                                />
                                                            ),
                                                        )}
                                                    </View>
                                                </EmojisColumnContainer>
                                            </View>
                                        ))}
                                    </React.Fragment>
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

export default InspectionDeviceStateScreen;

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
        flexDirection: 'row',
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
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
    },
    columnContainer: {
        width: '100%',
        marginBottom: 10,
    },
});
