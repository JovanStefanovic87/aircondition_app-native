/**
 * SECOND PAGE OF INSPECTION
 * Recording the general state of the device
 */
import React, { useState, useEffect } from 'react';
import { useInspectionStore } from '../store/store';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { calculateMinColumnWidth } from '../helpers/universalFunctions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DeviceState from '../components/table/DeviceState';
import DeviceStateColumnContainer from '../components/containers/DeviceStateTableContainer';
import {
    getInspectionDeviceStateDetails,
    getInspectionById,
    getInspectionImages,
    getInspectionTitleGroupImages,
} from '../../database/dataAccess/Query/sqlQueries';
import {
    saveInspectionDeviceState,
    saveInspectionImage,
    saveInspectionTitleGroupImage,
} from '../../database/dataAccess/Command/sqlCommands';
import { saveInspection } from '../../database/dataAccess/Command/sqlCommands';
import { MediaType, CameraOptions, launchImageLibrary } from 'react-native-image-picker';
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
    ImageGallery,
    ImageTypesByDbTable,
} from '../../database/types';
import DeviceParamsTableContainer from '../components/containers/DeviceParamsTableContainer';
import DeviceParameters from '../components/table/DeviceParameters';
import RowContainerFlex from '../components/containers/RowContainerFlex';
import AutoFitTableContainer from '../components/containers/AutoFitTableContainer';
import { customColors } from '../assets/styles/customStyles';
import { NON_VERIFICATION_GROUP_TYPES, IMAGE_TYPES } from '../helpers/constants';
import GalleryModal from '../components/modals/GalleryModal';
import BarcodeScanner from '../components/camera/BarcodeScanner';

type NewInspectionScreenNavigationProp = NavigationProp<Record<string, object>, string>;

const InspectionDeviceStateScreen = () => {
    const { setIsLoading, setLoadingText, setError } = useInspectionStore();
    const navigation = useNavigation<NewInspectionScreenNavigationProp>();
    const newInspectionId = useInspectionStore((state) => state.inspectionId);
    const [inspection, setInspection] = useState<Inspection>(null);
    const [inspectionDeviceStateDetails, setInspectionDeviceStateDetails] =
        useState<DeviceStateComponentsForInspection[]>(null);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [allCompleted, setAllCompleted] = useState<boolean[]>([]);
    const [isInspectionImage, setIsInspectionImage] = useState(false);
    const [imageSaveParams, setImageSaveParams] = useState<ImageDeviceStateSave | null>(null);
    const [galleryImages, setGalleryImages] = useState<ImageGallery[]>([]);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [galeryTitle, setGalleryTitle] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isScannerOpen, setScannerOpen] = useState(false);
    const [scannerTargetId, setScannerTargetId] = useState<string | null>(null);

    useEffect(() => {
        const fetchInspectionDetails = async () => {
            try {
                setIsLoading(true);
                setLoadingText('Lade Inspektionsdetails...');

                const [deviceStateDetails, inspectionData] = await Promise.all([
                    getInspectionDeviceStateDetails(newInspectionId),
                    getInspectionById(newInspectionId),
                ]);

                // DODAJ OVO:
                console.log('inspectionData:', JSON.stringify(inspectionData, null, 2));

                setInspectionDeviceStateDetails(deviceStateDetails);
                setInspection(inspectionData);
            } catch (err: any) {
                setError('Fehler beim Laden der Inspektionsdetails.');
            } finally {
                setIsLoading(false);
            }
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
        try {
            setIsLoading(true);
            setLoadingText('Bilder werden geladen...');

            const inspectionImages = await getInspectionImages(newInspectionId);
            if (inspectionImages && inspectionImages.length > 0) {
                const images = inspectionImages.map((image) => ({
                    imageId: image.id,
                    imagePath: image.storagePath,
                    imageType: IMAGE_TYPES.Inspection_Image as ImageTypesByDbTable,
                }));
                setGalleryImages(images);
                setGalleryVisible(true);
            } else {
                setError('Keine Bilder für diese Inspektion gefunden.');
            }
        } catch (err) {
            setError('Fehler beim Laden der Bilder.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadFromDevice = async () => {
        try {
            setIsLoading(true);
            setLoadingText('Bilder werden hochgeladen...');

            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 0, // ✅ dozvoli više slika
            });

            if (!result.assets?.length) return;

            for (const asset of result.assets) {
                if (!asset.uri) continue;

                if (isInspectionImage) {
                    handleSaveInspectionImage(asset.uri);
                } else {
                    handleSaveDeviceStateImage(asset.uri);
                }
            }
        } catch (err) {
            setError('Fehler beim Hochladen der Bilder.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeviceStateGalleryClick = async (titleId: number, groupTypeId: number) => {
        try {
            setIsLoading(true);
            setLoadingText('Gerätebilder werden geladen...');

            const deviceImages = await getInspectionTitleGroupImages(
                inspection.id,
                titleId,
                groupTypeId,
            );

            if (deviceImages && deviceImages.length > 0) {
                const images = deviceImages.map((image) => ({
                    imageId: image.id,
                    imagePath: image.storagePath,
                    imageType:
                        IMAGE_TYPES.Inspection_Element_Title_Group_Image as ImageTypesByDbTable,
                }));
                setGalleryImages(images);
                const group = inspectionDeviceStateDetails.find((g) =>
                    g.titleComponents.some((t) =>
                        t.deviceStateComponents.some(
                            (s) => s.titleComponentId === titleId && s.groupTypeId === groupTypeId,
                        ),
                    ),
                );
                const title = group?.titleComponents.find((t) =>
                    t.deviceStateComponents.some(
                        (s) => s.titleComponentId === titleId && s.groupTypeId === groupTypeId,
                    ),
                );
                setGalleryTitle(`${group?.groupTypeName ?? ''} - ${title?.name ?? ''}`);
                setGalleryVisible(true);
            } else {
                setError('Keine Bilder für diese Gruppe gefunden.');
            }
        } catch (err) {
            setError('Fehler beim Laden der Gerätebilder.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseGallery = () => {
        setGalleryVisible(false);
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
        saveInspectionImage(inspection.id, {
            name: 'Inspection_Image',
            storagePath: imagePath,
        });
    };

    const handleSaveDeviceStateImage = (imagePath: string) => {
        imageSaveParams &&
            saveInspectionTitleGroupImage(
                inspection.id,
                imageSaveParams.titleId,
                imageSaveParams.groupTypeId,
                {
                    name: 'Inspection_Title_Group_Image',
                    storagePath: imagePath,
                },
            );
    };

    const handleCameraToggleForDeviceState = (title: TitleComponent) => {
        const titleId = title.deviceStateComponents[0].titleComponentId;
        const groupTypeId = title.deviceStateComponents[0].groupTypeId;
        toggleCameraDevice(titleId, groupTypeId);
    };

    const openScannerForDeviceState = (deviceStateId: string) => {
        setScannerTargetId(deviceStateId);
        setScannerOpen(true);
    };

    const handleScannerResult = (result: string) => {
        if (!scannerTargetId || !inspectionDeviceStateDetails) return;

        const deviceState = inspectionDeviceStateDetails
            .flatMap((g) => g.titleComponents)
            .flatMap((t) => t.deviceStateComponents)
            .find((s) => s.inspectionDeviceStateId === scannerTargetId);

        if (!deviceState) return;

        saveDeviceStateAndUpdateInspection({
            id: scannerTargetId,
            value: deviceState.value,
            note: result,
        });

        setScannerTargetId(null);
    };

    if (isScannerOpen) {
        return (
            <View style={styles.container}>
                <BarcodeScanner
                    isScannerOpen={isScannerOpen}
                    setScannerOpen={setScannerOpen}
                    setScanResult={handleScannerResult}
                />
            </View>
        );
    }

    return (
        <>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <GalleryModal
                    visible={isGalleryVisible}
                    images={galleryImages}
                    setGalleryImages={setGalleryImages}
                    title={galeryTitle || 'ANLAGE -- ANLAGE'}
                    onClose={handleCloseGallery}
                />
                <TakePicture
                    visible={isCameraVisible}
                    onClose={handleCloseCamera}
                    saveImage={
                        isInspectionImage ? handleSaveInspectionImage : handleSaveDeviceStateImage
                    }
                    photoPreview={photoPreview}
                    setPhotoPreview={setPhotoPreview}
                />
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
                                        onPressUpload={() => {
                                            setIsInspectionImage(true);
                                            handleUploadFromDevice();
                                        }}
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
                                                            isSingleElement={true}
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
                                                                onPressUpload={() => {
                                                                    const titleId =
                                                                        title
                                                                            .deviceStateComponents[0]
                                                                            .titleComponentId;
                                                                    const groupTypeId =
                                                                        title
                                                                            .deviceStateComponents[0]
                                                                            .groupTypeId;
                                                                    setIsInspectionImage(false);
                                                                    setImageSaveParams({
                                                                        titleId,
                                                                        groupTypeId,
                                                                    });
                                                                    handleUploadFromDevice();
                                                                }}
                                                            />

                                                            <View
                                                                style={styles.iconsGroupContainer}
                                                            >
                                                                {title.deviceStateComponents.map(
                                                                    (
                                                                        deviceState: DeviceStateComponent,
                                                                    ) => (
                                                                        <DeviceState
                                                                            key={deviceState.id}
                                                                            deviceState={
                                                                                deviceState
                                                                            }
                                                                            groupTypeName={
                                                                                group.groupTypeName
                                                                            }
                                                                            onOpenScanner={
                                                                                openScannerForDeviceState
                                                                            }
                                                                            saveInspectionDeviceState={
                                                                                saveDeviceStateAndUpdateInspection
                                                                            }
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

                <View style={styles.rightAlign}>
                    <PrimaryButton title="Nächster Schritt" onPress={submit} />
                </View>
            </KeyboardAvoidingView>
        </>
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
