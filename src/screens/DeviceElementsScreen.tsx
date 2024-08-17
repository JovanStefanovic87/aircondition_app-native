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
    getDeviceElementTypes,
    getDeviceElements,
    getInspectionDeviceElements,
} from '../../database/dataAccess/Query/sqlQueries';
import { DeviceElement, DeviceElementType, InspectionDeviceElement } from '../../database/types';
import DeviceElements from '../components/image/DeviceElements';
import InspectionDeviceElements from '../components/image/InspectionDeviceElements';
import { saveDeviceStatesByElementsToInspection } from '../../database/dataAccess/Command/sqlCommands';
import { customColors } from '../assets/styles/customStyles';
import PrimaryButton from '../components/buttons/PrimaryButton';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';

type NavScreenNavigationProp = NavigationProp<any, any>;

const DeviceElementsScreen: React.FC = () => {
    const inspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.inspectionDeviceElements,
    );
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );
    const deviceElementSort = useDeviceElementSortStore((state) => state.deviceOrder);
    const navigation = useNavigation<NavScreenNavigationProp>();
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [deviceElements, setDeviceElements] = useState<DeviceElement[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<number | null>(1);
    const [deviceElementTypes, setDeviceElementTypes] = useState<DeviceElementType[]>([]);
    const inspectionDeviceElementsPositions = [1, 2, 3];
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const inspectionDevicesForNextStep = inspectionDeviceElements.map(
        (element) => element.deviceElementId,
    );

    useEffect(() => {
        fetchDeviceElementTypes();
        fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
        handleDeviceElements();
    }, [deviceElementSort]);

    const handleDeviceElements = async () => {
        try {
            const elements = await getDeviceElements();
            setDeviceElements(elements);
        } catch (error) {
            setErrorMessage(error.message);
            setErrorModalVisible(true);
        }
    };

    const submit = async () => {
        await saveDeviceStatesByElementsToInspection(inspectionId);

        navigation.navigate('ElementsStateScreen');
    };

    const fetchDeviceElementTypes = async () => {
        try {
            const elementTypes = await getDeviceElementTypes();
            setDeviceElementTypes(elementTypes);
        } catch (error) {
            setErrorMessage(error.message);
            setErrorModalVisible(true);
        }
    };

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
                    <View style={styles.innerContainer}>
                        <View style={styles.deviceElement}>
                            <DeviceElements
                                deviceElements={deviceElements}
                                setSelectedTypeId={setSelectedTypeId}
                                selectedTypeId={selectedTypeId}
                                deviceElementTypes={deviceElementTypes}
                            />
                        </View>
                        {inspectionDeviceElementsPositions.map((positionId) => {
                            const filteredElements = inspectionDeviceElements.filter(
                                (element) => element.elementPositionId === positionId,
                            );
                            return (
                                <View style={styles.deviceElement} key={positionId}>
                                    <InspectionDeviceElements
                                        inspectionDeviceElements={filteredElements}
                                        positionId={positionId}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
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
    },
    rightAlign: {
        display: 'flex',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
});

export default DeviceElementsScreen;
