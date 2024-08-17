import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
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
} from '../../database/dataAccess/Query/sqlQueries';
import {
    DeviceStateComponent,
    DeviceStateComponentsForInspection,
    InspectionDeviceElement,
    InspectionDeviceStateUpdate,
    TitleComponent,
} from '../../database/types';
import InspectionDeviceElementsMerged from '../components/image/InspectionDeviceElementsMerged';
import { saveInspectionDeviceState } from '../../database/dataAccess/Command/sqlCommands';
import { customColors } from '../assets/styles/customStyles';
import PrimaryButton from '../components/buttons/PrimaryButton';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';
import RowContainerFlex from '../components/containers/RowContainerFlex';
import AutoFitTableContainer from '../components/containers/AutoFitTableContainer';
import DeviceStateColumnContainer from '../components/containers/DeviceStateTableContainer';
import InspectionTitle from '../components/text/DeviceStateTitle';
import { launchImageLibrary, MediaType, CameraOptions } from 'react-native-image-picker';
import { calculateMinColumnWidth } from '../helpers/universalFunctions';
import DeviceStateMerged from '../components/table/DeviceStateMerged';

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
    const [allCompleted, setAllCompleted] = useState<boolean[]>([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            console.log('rendered');
            try {
                const result = await getInspectionElementStateDetails(
                    inspectionId,
                    selectedElementId,
                );
                if (result) {
                    setInspectionDeviceStateDetails(result);
                }
            } catch (error) {
                console.error('Error fetching inspection device state details:', error);
            }
        };
        fetchInitialData();
    }, [selectedElementId, inspectionId, selectedDeviceElementId]);

    const toggleCamera = () => {
        setCameraVisible(!isCameraVisible);
    };

    console.log(selectedDeviceElementId);

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
                }
            }
        });
    };

    const handleCloseCamera = () => {
        setCameraVisible(false);
    };

    const submit = async () => {
        if (isAllCompleted()) {
            navigation.navigate('AllInspectionsScreen');
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

    /* -------------------------------------------------------------------------------------------------------------- */

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

    return (
        <View style={styles.container}>
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
                                (group: DeviceStateComponentsForInspection, groupIndex: number) => (
                                    <React.Fragment key={groupIndex}>
                                        {group.titleComponents.map((title: TitleComponent, j) => (
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
                                                        onPressCamera={toggleCamera}
                                                        onPressGallery={handleGalleryClick}
                                                    />
                                                    <View style={styles.iconsGroupContainer}>
                                                        {title.deviceStateComponents.map(
                                                            (deviceState: DeviceStateComponent) => (
                                                                <DeviceStateMerged
                                                                    deviceState={deviceState}
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
                                        ))}
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
