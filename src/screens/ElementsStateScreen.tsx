//src\screens\ElementsStateScreen.tsx
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
    getInspectionDeviceElements,
    getInspectionElementStateDetails,
    getDeviceElementCompletionState,
    getInspectionType,
    getInspectionElementTitleGroupImages,
} from '../../database/dataAccess/Query/sqlQueries';
import {
    DeviceElementCompletionState,
    DeviceStateComponentsForInspection,
    DeviceStateElementForInspection,
    ImageDeviceStateSave,
    ImageGallery,
    ImageTypesByDbTable,
    InspectionDeviceElement,
    InspectionDeviceStateUpdate,
    TitleComponent,
} from '../../database/types';
import InspectionDeviceElementsMerged from '../components/image/InspectionDeviceElementsMerged';
import {
    saveInspectionElementTitleGroupImage,
    saveInspectionDeviceState,
} from '../../database/dataAccess/Command/sqlCommands';
import { customColors } from '../assets/styles/customStyles';
import PrimaryButton from '../components/buttons/PrimaryButton';
import RowContainerFlex from '../components/containers/RowContainerFlex';
import AutoFitTableContainer from '../components/containers/AutoFitTableContainer';
import DeviceStateColumnContainer from '../components/containers/DeviceStateTableContainer';
import InspectionTitle from '../components/text/DeviceStateTitle';
import { launchImageLibrary } from 'react-native-image-picker';
import { calculateMinColumnWidth } from '../helpers/universalFunctions';
import DeviceStateMerged from '../components/table/DeviceStateMerged';
import GalleryModal from '../components/modals/GalleryModal';
import TakePicture from '../components/camera/TakePicture';
import { IMAGE_TYPES } from '../helpers/constants';
import ElementImagesSection from '../components/image/ElementImagesSection';

type NavScreenNavigationProp = NavigationProp<any, any>;

const ElementsStateScreen: React.FC = () => {
    const { setIsLoading, setLoadingText, setError } = useInspectionStore();
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );
    const [inspectionType, setInspectionType] = useState<number | null>(null);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [selectedDeviceElementId, setSelectedDeviceElementId] = useState<string | null>(null);
    const deviceElementSort = useDeviceElementSortStore((state) => state.deviceOrder);
    const navigation = useNavigation<NavScreenNavigationProp>();
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [inspectionDeviceStateDetails, setInspectionDeviceStateDetails] = useState<
        DeviceStateElementForInspection[]
    >([]);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [elementCompleted, setElementCompleted] = useState<{ [key: string]: boolean } | null>(
        null,
    );
    const [allElementsCompleted, setAllElementsCompleted] = useState<boolean>(false);
    const [deviceElementCompleted, setDeviceElementCompleted] = useState<
        DeviceElementCompletionState[]
    >([]);
    const [imageSaveParams, setImageSaveParams] = useState<ImageDeviceStateSave | null>(null);
    const [galleryImages, setGalleryImages] = useState<ImageGallery[]>([]);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [galeryTitle, setGalleryTitle] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                setLoadingText('Lade Geräte-Elemente...');

                const result = await getInspectionElementStateDetails(
                    inspectionId,
                    selectedElementId,
                );

                if (result && result.length > 0) {
                    setInspectionDeviceStateDetails(result);
                    initializeCompletionStatus(result);
                } else {
                    setInspectionDeviceStateDetails([]);
                }
            } catch (error) {
                console.error('Error fetching inspection device state details:', error);
                setError('Fehler beim Laden der Geräte-Elemente.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [inspectionId, selectedElementId, selectedDeviceElementId]);

    const isCompleteCheckPerElement = async () => {
        const elementCheck = await getDeviceElementCompletionState(inspectionId);
        setDeviceElementCompleted(elementCheck);
        const elementsCompleted = elementCheck.every((element) => element.isCompleted);
        setAllElementsCompleted(elementsCompleted);
    };

    useEffect(() => {
        const fetchInspectionType = async () => {
            try {
                setIsLoading(true);
                setLoadingText('Lade Inspektionstyp...');
                const type = await getInspectionType(inspectionId);
                setInspectionType(type);
            } catch (error) {
                setError('Fehler beim Laden des Inspektionstyps.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchInspectionType();
    }, [inspectionId]);

    useEffect(() => {
        isCompleteCheckPerElement();
    }, [elementCompleted]);

    const toggleCameraDevice = (titleId: number, groupTypeId: number) => {
        setCameraVisible(!isCameraVisible);
        setImageSaveParams({ titleId: titleId, groupTypeId: groupTypeId });
    };

    const saveDeviceStateAndUpdateInspection = (deviceState: InspectionDeviceStateUpdate) => {
        saveInspectionDeviceState(deviceState);
        const updatedInspection = inspectionDeviceStateDetails.map(
            (group: DeviceStateElementForInspection) => ({
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

    const handleUploadFromDevice = async (inspectionElementDeviceId: string) => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo' });

            if (result.assets && result.assets.length > 0) {
                const imagePath = result.assets[0].uri;
                await handleSaveDeviceElementImage(
                    imagePath,
                    inspectionElementDeviceId,
                    imageSaveParams?.titleId,
                    imageSaveParams?.groupTypeId,
                );
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleDeviceStateGalleryClick = async (
        titleId: number,
        groupTypeId: number,
        inspectionElementDeviceId: string,
    ) => {
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
            const deviceImages = await getInspectionElementTitleGroupImages(
                inspectionElementDeviceId,
                titleId,
                groupTypeId,
            );
            if (deviceImages && deviceImages.length > 0) {
                setGalleryImages(
                    deviceImages.map((image) => ({
                        imageId: image.id,
                        imagePath: image.storagePath,
                        imageType:
                            IMAGE_TYPES.Inspection_Element_Title_Group_Image as ImageTypesByDbTable,
                    })),
                );

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
            if ([1, 2, 6].includes(inspectionType)) {
                navigation.navigate('QuestionsScreen');
            } else {
                navigation.navigate('AllInspectionsScreen');
            }
        } else {
            setError('Nicht alle Elemente sind abgeschlossen. Bitte füllen Sie alle Felder aus.');
        }
    };

    const initializeCompletionStatus = (details: DeviceStateComponentsForInspection[]) => {
        const initialStatus: { [key: string]: boolean } = {};

        details.forEach((group, groupIndex) => {
            group.titleComponents.forEach((title, titleIndex) => {
                const titleComponentId =
                    title.deviceStateComponents.length > 0
                        ? title.deviceStateComponents[0].titleComponentId
                        : null;

                const groupId = `${group.groupTypeName}-${
                    titleComponentId || titleIndex
                }-${groupIndex}`;

                initialStatus[groupId] =
                    title.deviceStateComponents.length > 0 &&
                    title.deviceStateComponents.every((state) => {
                        const value = state.value as unknown;

                        if (state.deviceStateValues.length === 0) return true;
                        if (value === null || value === undefined) return false;
                        if (typeof value === 'string') return value.trim() !== '';
                        if (typeof value === 'number') return value !== 0;

                        return Boolean(value);
                    });
            });
        });
        setElementCompleted(initialStatus);
    };

    const checkAndUpdateCompletionStatus = (
        updatedDetails: DeviceStateComponentsForInspection[],
    ) => {
        const updatedStatus = { ...elementCompleted };
        updatedDetails.forEach((group, groupIndex) => {
            const groupId = `${group.groupTypeName}-${groupIndex}`;
            updatedStatus[groupId] = group.titleComponents.every((title) =>
                title.deviceStateComponents.every(
                    (state) => state.value !== null && String(state.value) !== '',
                ),
            );
        });
        setElementCompleted(updatedStatus);
    };

    const isAllCompleted = (): boolean => {
        const incompleteStates = [];

        const allCompleted = inspectionDeviceStateDetails.every((group) =>
            group.titleComponents.every((title) =>
                title.deviceStateComponents.every((state) => {
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
            setIsLoading(true);
            setLoadingText('Lade Inspektionsgeräte...');
            const elements = await getInspectionDeviceElements(inspectionId);
            setInspectionDeviceElements(elements);
        } catch (error) {
            setError('Fehler beim Laden der Geräte-Elemente.');
        } finally {
            setIsLoading(false);
        }
    };

    const updateCompletionStatus = (groupId: string, isCompleted: boolean): void => {
        setElementCompleted((prevStatus) => {
            if (prevStatus[groupId] === isCompleted) {
                return prevStatus;
            }

            return {
                ...prevStatus,
                [groupId]: isCompleted,
            };
        });
    };

    const handleCameraToggleForDeviceState = (title: TitleComponent) => {
        const titleId = title.deviceStateComponents[0].titleComponentId;
        const groupTypeId = title.deviceStateComponents[0].groupTypeId;
        toggleCameraDevice(titleId, groupTypeId);
    };

    const handleSaveDeviceElementImage = async (
        path: string,
        inspectionDeviceElementId: string,
        titleId: number,
        groupTypeId: number,
    ) => {
        try {
            setIsLoading(true);
            setLoadingText('Speichere Bild...');
            const record = { storagePath: path, name: 'Inspection_Element_Title_Group_Image' };
            await saveInspectionElementTitleGroupImage(
                inspectionDeviceElementId,
                titleId,
                groupTypeId,
                record,
            );
        } catch (error) {
            setError('Fehler beim Speichern des Bildes.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <GalleryModal
                visible={isGalleryVisible}
                images={galleryImages}
                title={galeryTitle || 'ANLAGE -- ANLAGE'}
                onClose={handleCloseGallery}
                setGalleryImages={setGalleryImages}
            />
            <TakePicture
                visible={isCameraVisible}
                onClose={handleCloseCamera}
                saveImage={(path) =>
                    imageSaveParams &&
                    handleSaveDeviceElementImage(
                        path,
                        inspectionDeviceStateDetails[0].inspectionDeviceElementId,
                        imageSaveParams?.titleId,
                        imageSaveParams?.groupTypeId,
                    )
                }
                photoPreview={photoPreview}
                setPhotoPreview={setPhotoPreview}
            />

            <GestureHandlerRootView style={styles.scrollContainer}>
                <ScrollView style={styles.scrollView}>
                    <View>
                        <View style={styles.deviceElement}>
                            <InspectionDeviceElementsMerged
                                selectedElementId={selectedElementId}
                                setSelectedElementId={setSelectedElementId}
                                setSelectedDeviceElementId={setSelectedDeviceElementId}
                                deviceElementCompleted={deviceElementCompleted}
                            />
                        </View>
                        {selectedDeviceElementId && (
                            <ElementImagesSection
                                inspectionDeviceElementId={selectedDeviceElementId}
                            />
                        )}
                    </View>

                    <RowContainerFlex>
                        {inspectionDeviceStateDetails.map((group, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                                {group.titleComponents.map((title, titleIndex) => {
                                    // Pravilna identifikacija title-a
                                    const titleName = title.name?.trim() || ``;
                                    const groupId = `${group.groupTypeName}-${titleName}-${titleIndex}`;

                                    // Proveravamo da li title zaista pripada ovom groupTypeName
                                    const filteredComponents = title.deviceStateComponents.filter(
                                        (component) => component.groupTypeId === groupIndex + 1,
                                    );

                                    if (filteredComponents.length === 0) return null;

                                    return (
                                        <AutoFitTableContainer
                                            key={groupId}
                                            minColumnWidth={calculateMinColumnWidth(49)}
                                        >
                                            <DeviceStateColumnContainer
                                                title={`${group.groupTypeName} - ${titleName}`}
                                                group={{ ...group, titleComponents: [title] }}
                                                setIsGroupCompleted={(isCompleted) =>
                                                    updateCompletionStatus(groupId, isCompleted)
                                                }
                                            >
                                                <InspectionTitle
                                                    title={titleName}
                                                    onPressCamera={() =>
                                                        handleCameraToggleForDeviceState(title)
                                                    }
                                                    onPressGallery={() =>
                                                        handleDeviceStateGalleryClick(
                                                            title.deviceStateComponents[0]
                                                                ?.titleComponentId,
                                                            title.deviceStateComponents[0]
                                                                ?.groupTypeId,
                                                            group.inspectionDeviceElementId,
                                                        )
                                                    }
                                                    onPressUpload={() =>
                                                        handleUploadFromDevice(
                                                            group.inspectionDeviceElementId,
                                                        )
                                                    }
                                                />

                                                <View style={styles.iconsGroupContainer}>
                                                    {filteredComponents.map((deviceState) => (
                                                        <DeviceStateMerged
                                                            key={deviceState.id}
                                                            deviceState={deviceState}
                                                            saveInspectionDeviceState={
                                                                saveDeviceStateAndUpdateInspection
                                                            }
                                                        />
                                                    ))}
                                                </View>
                                            </DeviceStateColumnContainer>
                                        </AutoFitTableContainer>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </RowContainerFlex>
                </ScrollView>
                <View style={styles.horizontalLine}></View>
            </GestureHandlerRootView>
            <View style={styles.rightAlign}>
                <PrimaryButton
                    title="Nächster Schritt"
                    onPress={submit}
                    isDisabled={!allElementsCompleted}
                />
            </View>
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
