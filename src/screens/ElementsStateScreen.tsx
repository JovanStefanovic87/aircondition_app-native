import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
    useInspectionStore,
    useInspectionDeviceElementsStore,
    useDeviceElementSortStore,
} from '../store/store';
import {
    getDeviceElementCompletionState,
    getInspectionDeviceElements,
    getInspectionElementStateDetails,
    getDeviceStateImages,
} from '../../database/dataAccess/Query/sqlQueries';
import {
    DeviceStateComponent,
    DeviceStateComponentsForInspection,
    ImageDeviceStateSave,
    InspectionDeviceElement,
    InspectionDeviceStateUpdate,
    TitleComponent,
} from '../../database/types';
import InspectionDeviceElementsMerged from '../components/image/InspectionDeviceElementsMerged';
import {
    saveDeviceStateImage,
    saveInspectionDeviceState,
} from '../../database/dataAccess/Command/sqlCommands';
import { customColors } from '../assets/styles/customStyles';
import PrimaryButton from '../components/buttons/PrimaryButton';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';
import RowContainerFlex from '../components/containers/RowContainerFlex';
import AutoFitTableContainer from '../components/containers/AutoFitTableContainer';
import DeviceStateColumnContainer from '../components/containers/DeviceStateTableContainer';
import InspectionTitle from '../components/text/DeviceStateTitle';
import { calculateMinColumnWidth } from '../helpers/universalFunctions';
import DeviceStateMerged from '../components/table/DeviceStateMerged';
import GalleryModal from '../components/modals/GalleryModal';
import TakePicture from '../components/camera/TakePicture';

type NavScreenNavigationProp = NavigationProp<any, any>;

const ElementsStateScreen: React.FC = () => {
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [selectedDeviceElementId, setSelectedDeviceElementId] = useState<string | null>(null);
    const deviceElementSort = useDeviceElementSortStore((state) => state.deviceOrder);
    const navigation = useNavigation<NavScreenNavigationProp>();
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [inspectionDeviceStateDetails, setInspectionDeviceStateDetails] = useState<
        DeviceStateComponentsForInspection[]
    >([]);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [allCompleted, setAllCompleted] = useState<{ [key: string]: boolean }>({});
    const [imageSaveParams, setImageSaveParams] = useState<ImageDeviceStateSave | null>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [galeryTitle, setGalleryTitle] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const result = await getInspectionElementStateDetails(
                    inspectionId,
                    selectedElementId,
                );
                if (result) {
                    setInspectionDeviceStateDetails(result);
                    initializeCompletionStatus(result);
                }
            } catch (error) {
                console.error('Error fetching inspection device state details:', error);
            }
        };
        fetchInitialData();
    }, [selectedElementId, inspectionId, selectedDeviceElementId]);

    const toggleCameraDevice = (titleId: number, groupTypeId: number) => {
        setCameraVisible(!isCameraVisible);
        setImageSaveParams({ titleId: titleId, groupTypeId: groupTypeId });
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
        checkAndUpdateCompletionStatus(updatedInspection);
    };

    const handleDeviceStateGalleryClick = async (titleId: number, groupTypeId: number) => {
        if (!inspectionDeviceStateDetails) {
            console.error('InspectionDeviceStateDetails is not loaded.');
            return;
        }

        const group = inspectionDeviceStateDetails.find((group) =>
            group.titleComponents.some((title) =>
                title.deviceStateComponents.some(
                    (deviceState) =>
                        deviceState.titleComponentId === titleId &&
                        deviceState.groupTypeId === groupTypeId,
                ),
            ),
        );

        if (!group) {
            console.error(
                `Group containing titleId: ${titleId} and groupTypeId: ${groupTypeId} not found`,
            );
            return;
        }

        const title = group.titleComponents.find((title) =>
            title.deviceStateComponents.some(
                (deviceState) =>
                    deviceState.titleComponentId === titleId &&
                    deviceState.groupTypeId === groupTypeId,
            ),
        );

        if (!title) {
            console.error(
                `Title with titleId: ${titleId} and groupTypeId: ${groupTypeId} not found`,
            );
            return;
        }

        const galleryTitle = `${group.groupTypeName} - ${title.name}`;
        setGalleryTitle(galleryTitle);

        if (selectedElementId) {
            const deviceImages = await getDeviceStateImages(
                titleId,
                groupTypeId,
                parseInt(selectedElementId),
            );
            if (deviceImages && deviceImages.length > 0) {
                const imagePaths = deviceImages.map((image) => image.storagePath);
                setGalleryImages(imagePaths);
                setGalleryVisible(true);
            } else {
                console.log('No images found for this titleId and groupTypeId.');
            }
        }
    };

    const handleCloseGallery = () => {
        setGalleryVisible(false);
    };

    const handleCloseCamera = () => {
        setCameraVisible(false);
    };

    const submit = async () => {
        const isPageCompleted = await isAllCompleted();

        if (isPageCompleted) {
            navigation.navigate('AllInspectionsScreen');
        } else {
            setErrorMessage('Niet alle elementen zijn voltooid. Vul alstublieft alle velden in.');
            setErrorModalVisible(true);
        }
    };

    const initializeCompletionStatus = (details: DeviceStateComponentsForInspection[]) => {
        const initialStatus: { [key: string]: boolean } = {};
        details.forEach((group, groupIndex) => {
            const groupId = `${group.groupTypeName}-${groupIndex}`;
            initialStatus[groupId] = group.titleComponents.every((title) =>
                title.deviceStateComponents.every(
                    (state) =>
                        state.value !== null &&
                        (typeof state.value === 'string' ? state.value !== '' : state.value !== 0),
                ),
            );
        });
        setAllCompleted(initialStatus);
    };

    const checkAndUpdateCompletionStatus = (
        updatedDetails: DeviceStateComponentsForInspection[],
    ) => {
        const updatedStatus = { ...allCompleted };
        updatedDetails.forEach((group, groupIndex) => {
            const groupId = `${group.groupTypeName}-${groupIndex}`;
            updatedStatus[groupId] = group.titleComponents.every((title) =>
                title.deviceStateComponents.every(
                    (state) => state.value !== null && String(state.value) !== '',
                ),
            );
        });
        setAllCompleted(updatedStatus);
    };

    const isDeviceStateComplete = (deviceStateComponents) => {
        return deviceStateComponents.every((state) => {
            // Proveri da li je state value validna ili je deviceStateValues prazan niz
            return (
                state.value !== null &&
                state.value !== undefined &&
                (state.deviceStateValues.length === 0 || state.value !== null)
            );
        });
    };

    const isAllCompleted = (): boolean => {
        const incompleteStates = [];

        const allCompleted = inspectionDeviceStateDetails.every((group) =>
            group.titleComponents.every((title) =>
                title.deviceStateComponents.every((state) => {
                    // Provera: ako je `deviceStateValues` prazan, smatra se kompletnim
                    const isComplete = state.deviceStateValues.length === 0 || state.value !== null;

                    if (!isComplete) {
                        incompleteStates.push({
                            groupTypeName: group.groupTypeName,
                            titleName: title.name,
                            deviceState: state,
                        });
                    }

                    return isComplete;
                }),
            ),
        );

        if (incompleteStates.length > 0) {
            console.log('Incomplete states:', JSON.stringify(incompleteStates, null, 2));
        }

        console.log('All completed:', allCompleted);
        return allCompleted;
    };

    useEffect(() => {
        fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
    }, [deviceElementSort]);

    const fetchInspectionDeviceElements = async (
        inspectionId: string,
        setInspectionDeviceElements: (elements: InspectionDeviceElement[]) => void,
    ) => {
        try {
            const elements = await getInspectionDeviceElements(inspectionId);
            setInspectionDeviceElements(elements);
        } catch (error) {
            setErrorMessage(error.message);
            setErrorModalVisible(true);
        }
    };

    const updateCompletionStatus = (groupId: string, isCompleted: boolean): void => {
        setAllCompleted((prevStatus) => ({
            ...prevStatus,
            [groupId]: isCompleted,
        }));
    };

    const handleCameraToggleForDeviceState = (title: TitleComponent) => {
        const titleId = title.deviceStateComponents[0].titleComponentId;
        const groupTypeId = title.deviceStateComponents[0].groupTypeId;
        toggleCameraDevice(titleId, groupTypeId);
    };

    const handleSaveDeviceElementImage = async (
        path: string,
        titleId: number,
        groupTypeId: number,
        deviceElementId?: number,
    ) => {
        try {
            const record = {
                storagePath: path,
                name: 'Device Image',
            };

            // Save the image record with the updated API
            await saveDeviceStateImage(titleId, groupTypeId, record, deviceElementId);
            console.log('Image saved successfully');
        } catch (error) {
            console.error('Error saving device element image:', error);
            setErrorMessage('Failed to save the image. Please try again.');
            setErrorModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <GalleryModal
                visible={isGalleryVisible}
                images={galleryImages}
                title={galeryTitle || 'ANLAGE -- ANLAGE'}
                onClose={handleCloseGallery}
            />
            {isCameraVisible ? (
                <TakePicture
                    onClose={handleCloseCamera}
                    saveImage={(path) =>
                        handleSaveDeviceElementImage(
                            path,
                            imageSaveParams?.titleId!,
                            imageSaveParams?.groupTypeId!,
                            selectedDeviceElementId ? parseInt(selectedDeviceElementId) : undefined,
                        )
                    }
                />
            ) : (
                <GestureHandlerRootView style={styles.scrollContainer}>
                    <ScrollView style={styles.scrollView}>
                        <View>
                            <View style={styles.deviceElement}>
                                <InspectionDeviceElementsMerged
                                    selectedElementId={selectedElementId}
                                    setSelectedElementId={setSelectedElementId}
                                    setSelectedDeviceElementId={setSelectedDeviceElementId}
                                />
                            </View>
                        </View>
                        <RowContainerFlex>
                            {inspectionDeviceStateDetails &&
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
                                                                    isCompleted,
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
                                                                            ?.titleComponentId,
                                                                        title
                                                                            .deviceStateComponents[0]
                                                                            ?.groupTypeId,
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
                                                                        <DeviceStateMerged
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
                <PrimaryButton
                    title="Nächster Schritt"
                    onPress={submit}
                    isDisabled={!isAllCompleted()} // Disable button if not all completed
                />
            </View>
            <ErrorInformationModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
        </View>
    );
};

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
        alignItems: 'flex-start',
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
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 20,
    },
    deviceElement: {
        gap: 5,
        width: '100%',
        minHeight: 200,
        borderWidth: 2,
        borderColor: customColors.blueDark,
        borderRadius: 10,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: customColors.blueLighter,
        marginBottom: 5,
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
    horizontalLine: {
        borderBottomColor: customColors.grayLight,
        borderBottomWidth: 0.5,
        width: '100%',
    },
});

export default ElementsStateScreen;
