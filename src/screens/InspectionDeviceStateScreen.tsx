import React, { useState, useEffect } from 'react';
import { useInspectionStore } from '../store/store';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { calculateMinColumnWidth } from '../helpers/universalFunctions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DeviceState from '../components/table/DeviceState';
import DeviceStateColumnContainer from '../components/containers/DeviceStateTableContainer';
import {
    getInspectionDeviceStateDetails,
    getInspectionById,
    getInspectionImages,
    getDeviceStateImages,
} from '../../database/dataAccess/Query/sqlQueries';
import {
    saveDeviceStateImage,
    saveInspectionDeviceState,
    saveInspectionImage,
} from '../../database/dataAccess/Command/sqlCommands';
import { saveInspection } from '../../database/dataAccess/Command/sqlCommands';
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
    ImageDeviceStateSave,
} from '../../database/types';
import DeviceParamsTableContainer from '../components/containers/DeviceParamsTableContainer';
import DeviceParameters from '../components/table/DeviceParameters';
import RowContainerFlex from '../components/containers/RowContainerFlex';
import AutoFitTableContainer from '../components/containers/AutoFitTableContainer';
import { customColors } from '../assets/styles/customStyles';
import { NON_VERIFICATION_GROUP_TYPES } from '../helpers/constants';

type NewInspectionScreenNavigationProp = NavigationProp<Record<string, object>, string>;

const InspectionDeviceStateScreen = () => {
    const navigation = useNavigation<NewInspectionScreenNavigationProp>();
    const newInspectionId = useInspectionStore((state) => state.inspectionId);
    const [inspection, setInspection] = useState<Inspection>(null);
    const [inspectionDeviceStateDetails, setInspectionDeviceStateDetails] =
        useState<DeviceStateComponentsForInspection[]>(null);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [allCompleted, setAllCompleted] = useState<boolean[]>([]);
    const [avatarSource, setAvatarSource] = useState(null);
    const [isInspectionImage, setIsInspectionImage] = useState(false);
    const [imageSaveParams, setImageSaveParams] = useState<ImageDeviceStateSave | null>(null);
    const [imagePath, setImagePath] = useState<string | null>(null);

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

    const toggleCameraInspection = () => {
        setCameraVisible(!isCameraVisible);
        setIsInspectionImage(true);
    };
    const toggleCameraDevice = (titleId: number, groupTypeId: number) => {
        setCameraVisible(!isCameraVisible);
        setIsInspectionImage(false);
        setImageSaveParams({ titleId: titleId, groupTypeId: groupTypeId });
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

    const handleGalleryClick = async () => {
        const inspectionImages = await getInspectionImages(newInspectionId);
        console.log('inspectionImages', JSON.stringify(inspectionImages));
        if (inspectionImages && inspectionImages.length > 0)
            setImagePath(inspectionImages[0].storagePath);
    };

    const handleDeviceStateGalleryClick = async (titleId, groupTypeId) => {
        const deviceImages = await getDeviceStateImages(titleId, groupTypeId);
        console.log('deviceImages', JSON.stringify(deviceImages));

        if (deviceImages && deviceImages.length > 0) setImagePath(deviceImages[0].storagePath);
    };

    const handleCloseCamera = () => {
        setCameraVisible(false);
    };

    const submit = async () => {
        if (isAllCompleted()) {
            navigation.navigate('DeviceElementsScreen');
        } else {
            console.log('error');
        }
    };

    const updateCompletionStatus = (identifier: string, isCompleted: boolean) => {
        setAllCompleted((prevStatus) => ({
            ...prevStatus,
            [identifier]: isCompleted,
        }));
    };

    const isAllCompleted = () => {
        const completionValues = Object.values(allCompleted);
        return completionValues.length > 0 && completionValues.every((status) => status === true);
    };

    const handleSaveInspectionImage = (imagePath: string) => {
        saveInspectionImage(newInspectionId, {
            name: 'Inspection Device pictures',
            storagePath: imagePath,
        });
    };

    const handleSaveDeviceStateImage = (imagePath: string) => {
        imageSaveParams &&
            saveDeviceStateImage(imageSaveParams.titleId, imageSaveParams.groupTypeId, {
                name: 'Device pictures',
                storagePath: imagePath,
            });
    };

    const handleCameraToggleForDeviceState = (title: TitleComponent) => {
        const titleId = title.deviceStateComponents[0].titleComponentId;
        const groupTypeId = title.deviceStateComponents[0].groupTypeId;
        toggleCameraDevice(titleId, groupTypeId);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {imagePath && <Image source={{ uri: imagePath }} style={styles.image} />}

            {isCameraVisible ? (
                <TakePicture
                    onClose={handleCloseCamera}
                    saveImage={
                        isInspectionImage ? handleSaveInspectionImage : handleSaveDeviceStateImage
                    }
                />
            ) : (
                <GestureHandlerRootView style={styles.scrollContainer}>
                    <ScrollView style={styles.scrollView}>
                        <RowContainerFlex>
                            {inspection !== null && (
                                <DeviceParamsTableContainer parameters={inspection}>
                                    <DeviceParameters
                                        inspection={inspection}
                                        setInspection={setInspection}
                                        saveInspection={saveInspection}
                                        onPressCamera={toggleCameraInspection}
                                        onPressGallery={handleGalleryClick}
                                    />
                                </DeviceParamsTableContainer>
                            )}
                        </RowContainerFlex>
                        <RowContainerFlex>
                            {inspectionDeviceStateDetails !== null &&
                                inspectionDeviceStateDetails.map(
                                    (
                                        group: DeviceStateComponentsForInspection,
                                        groupIndex: number,
                                    ) => (
                                        <React.Fragment key={groupIndex}>
                                            {group.titleComponents.map(
                                                (title: TitleComponent, j) => (
                                                    <AutoFitTableContainer
                                                        key={j}
                                                        minColumnWidth={calculateMinColumnWidth(49)}
                                                    >
                                                        <DeviceStateColumnContainer
                                                            title={group.groupTypeName}
                                                            group={group}
                                                            setIsGroupCompleted={(isCompleted) =>
                                                                updateCompletionStatus(
                                                                    `${group.groupTypeName}-${groupIndex}`,
                                                                    NON_VERIFICATION_GROUP_TYPES.includes(
                                                                        group.groupTypeName,
                                                                    ) || isCompleted,
                                                                )
                                                            }
                                                        >
                                                            <InspectionTitle
                                                                title={title.name}
                                                                onPressCamera={() =>
                                                                    handleCameraToggleForDeviceState(
                                                                        title,
                                                                    )
                                                                }
                                                                onPressGallery={() =>
                                                                    handleDeviceStateGalleryClick(
                                                                        title
                                                                            .deviceStateComponents[0]
                                                                            .titleComponentId,
                                                                        title
                                                                            .deviceStateComponents[0]
                                                                            .groupTypeId,
                                                                    )
                                                                }
                                                            />
                                                            <View
                                                                style={styles.iconsGroupContainer}
                                                            >
                                                                {title.deviceStateComponents.map(
                                                                    (
                                                                        deviceState: DeviceStateComponent,
                                                                    ) => (
                                                                        <DeviceState
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
                                                    </AutoFitTableContainer>
                                                ),
                                            )}
                                        </React.Fragment>
                                    ),
                                )}
                        </RowContainerFlex>
                    </ScrollView>
                    <View style={styles.horizontalLine}></View>
                </GestureHandlerRootView>
            )}
            <View style={styles.rightAlign}>
                <PrimaryButton title="Nächster Schritt" onPress={submit} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default InspectionDeviceStateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        paddingBottom: 30,
    },
    scrollContainer: {
        alignItems: 'center',
        width: '100%',
        maxHeight: '92%',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        borderColor: customColors.grayLight,
        borderWidth: 2,
        borderStyle: 'solid',
        borderBottomColor: 'transparent',
        padding: 10,
    },
    horizontalLine: {
        borderBottomColor: customColors.grayLight,
        borderBottomWidth: 0.5,
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
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
});
