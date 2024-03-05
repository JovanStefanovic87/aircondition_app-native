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
import DeviceStateContainer from '../components/containers/DeviceStateContainer';
import DeviceStateColumnContainer from '../components/containers/DeviceStateColumnContainer';
import {
    getInspectionDeviceStateDetails,
    getInspectionById,
} from '../../database/dataAccess/Query/sqlQueries';
import { saveInspectionDeviceState } from '../../database/dataAccess/Query/sqlCommands';
import { saveInspection } from '../../database/dataAccess/Query/sqlCommands';
import { launchImageLibrary, MediaType, CameraOptions } from 'react-native-image-picker';
import TakePicture from '../components/camera/TakePicture';
import InspectionTitle from '../components/text/DeviceStateTitle';
import PrimaryButton from '../components/buttons/PrimaryButton';
import {
    DeviceStateComponent,
    DeviceStateComponentsForInspection,
    InspectionDeviceStateUpdate,
    TitleComponent,
    Inspection,
} from '../../database/types';
import TextMain from '../components/text/TextMain';
import DeviceParametersContainer from '../components/containers/DeviceParametersContainer';

const InspectionDeviceStateScreen = () => {
    const newInspectionId = useInspectionStore((state) => state.inspectionId);
    const [inspection, setInspection] = useState<Inspection>(null);
    const [inspectionDeviceStateDetails, setInspectionDeviceStateDetails] =
        useState<DeviceStateComponentsForInspection[]>(null);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [avatarSource, setAvatarSource] = useState(null);

    const screenWidth = Dimensions.get('window').width;
    const width = screenWidth < 600 ? '100%' : '48%';

    useEffect(() => {
        const fetchInspectionDetails = async () => {
            const inspectionDeviceStateDetailsResult = await getInspectionDeviceStateDetails(
                newInspectionId,
            );
            setInspectionDeviceStateDetails(inspectionDeviceStateDetailsResult);
            const inspectionResult = await getInspectionById(newInspectionId);
            setInspection(inspectionResult);
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

    const saveDeviceStateAndUpdateInspection = (deviceState: InspectionDeviceStateUpdate) => {
        saveInspectionDeviceState(deviceState);
        const updatedInspection = inspectionDeviceStateDetails.map(
            (group: DeviceStateComponentsForInspection) => ({
                ...group,
                titleComponents: group.titleComponents.map((title) => ({
                    ...title,
                    deviceStateComponents: title.deviceStateComponents.map((state) => {
                        return deviceState.id === state.inspectionDeviceStateId
                            ? { ...state, value: deviceState.value, note: deviceState.note }
                            : state;
                    }),
                })),
            }),
        );
        setInspectionDeviceStateDetails(updatedInspection);
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
                        <View style={styles.rowContainer}>
                            {inspection !== null && (
                                <DeviceParametersContainer parameters={inspection}>
                                    <TextMain text={'id'} />
                                </DeviceParametersContainer>
                            )}
                        </View>
                        <View style={styles.rowContainer}>
                            {inspectionDeviceStateDetails !== null &&
                                inspectionDeviceStateDetails.map(
                                    (group: DeviceStateComponentsForInspection, i: number) => (
                                        <React.Fragment key={i}>
                                            {group.titleComponents.map(
                                                (title: TitleComponent, j) => (
                                                    <View
                                                        key={j}
                                                        style={[styles.columnContainer, { width }]}
                                                    >
                                                        <DeviceStateColumnContainer
                                                            title={group.groupTypeName}
                                                            group={group}
                                                        >
                                                            <InspectionTitle
                                                                title={title.name}
                                                                onPressCamera={toggleCamera}
                                                                onPressGallery={handleGalleryClick}
                                                            />
                                                            <View
                                                                style={styles.iconsGroupContainer}
                                                            >
                                                                {title.deviceStateComponents.map(
                                                                    (
                                                                        deviceState: DeviceStateComponent,
                                                                    ) => (
                                                                        <DeviceStateContainer
                                                                            deviceState={
                                                                                deviceState
                                                                            }
                                                                            saveInspectionDeviceState={
                                                                                saveDeviceStateAndUpdateInspection
                                                                            }
                                                                            key={deviceState.id}
                                                                        />
                                                                    ),
                                                                )}
                                                            </View>
                                                        </DeviceStateColumnContainer>
                                                    </View>
                                                ),
                                            )}
                                        </React.Fragment>
                                    ),
                                )}
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
        marginBottom: 10,
        width: '100%',
    },
    columnContainer: {
        width: '100%',
        marginBottom: 10,
        gap: 10,
    },
});
