import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
    useInspectionStore,
    useInspectionDeviceElementsStore,
    useDeviceElementSortStore,
} from '../store/store';
import NavButton from '../components/buttons/NavButton';
import {
    getDeviceElementTypes,
    getDeviceElements,
    getInspectionDeviceElements,
    getInspections,
} from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables } from '../../database/dataAccess/helpers';
import {
    DeviceElement,
    DeviceElementType,
    InspectionDeviceElementUpdate,
} from '../../database/types';
import DeviceElements from '../components/image/DeviceElements';
import InspectionDeviceElements from '../components/image/InspectionDeviceElements';
import DropdownElements from '../components/input/DropdownElements';
import {
    deleteInspectionDeviceElement,
    saveInspectionDeviceElement,
} from '../../database/dataAccess/Command/sqlCommands';
import { customColors } from '../assets/styles/customStyles';
import TextTitle from '../components/text/TextTitle';
import { fetchDeviceElementTypes, fetchInspectionDeviceElements } from '../helpers/api';

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
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);
    const [deviceElements, setDeviceElements] = useState<DeviceElement[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
    const [deviceElementTypes, setDeviceElementTypes] = useState<DeviceElementType[]>([]);
    const inspectionDeviceElementsPositions = [1, 2, 3];

    const handleNewInspectionPress = () => {
        setInspectionId(null);
        navigation.navigate('InspectionBasicDetailsScreen');
    };

    const handleAllInspectionsPress = () => {
        navigation.navigate('AllInspectionsScreen');
    };

    const handleHomePress = () => {
        navigation.navigate('HomeScreen');
    };

    useEffect(() => {
        fetchDeviceElementTypes(setDeviceElementTypes);
        fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
        handleDeviceElements();
    }, [deviceElementSort]);

    const deleteAllTabless = async () => {
        await deleteAllTables();
    };

    const handleDeviceElements = async () => {
        const elements = await getDeviceElements();
        setDeviceElements(elements);
        console.log('----------------------------------------------------');
        console.log('elements: ', elements);
    };

    const handleDeviceElementTypes = async () => {
        const elementTypes = await getDeviceElementTypes();
        console.log('----------------------------------------------------');
        console.log('elementTypes: ', elementTypes);
    };

    const handleGetInspectionElements = async (inspectionId: string) => {
        const inspectionDeviceElements = await getInspectionDeviceElements(inspectionId);
        console.log('----------------------------------------------------');
        console.log('inspectionDeviceElements: ', inspectionDeviceElements);
    };

    const handleGetAllInspections = async () => {
        const inspections = await getInspections();
        console.log('----------------------------------------------------');
        console.log('inspections: ', inspections);
    };

    const handleSaveInspectionElements = async () => {
        const record: InspectionDeviceElementUpdate = {
            inspectionId: inspectionId,
            deviceElementId: 2,
            deviceOrder: 2,
            elementPositionId: 1,
        };
        try {
            await saveInspectionDeviceElement(record);
            fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
        } catch (error) {
            console.error('Error saving inspection device element:', error);
            throw error;
        }
    };

    const handleDeleteInspectionElements = async (inspectionId: string) => {
        await deleteInspectionDeviceElement(inspectionId);
    };

    function getPositionName(positionId: number): string {
        switch (positionId) {
            case 1:
                return 'Zonen Davor';
            case 2:
                return 'Anlage';
            case 3:
                return 'Zonen Danach';
            default:
                return '';
        }
    }

    return (
        <GestureHandlerRootView style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <NavButton
                        onPress={() => deleteAllTabless()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Delete All Tables"
                    />
                    <NavButton
                        onPress={() => handleGetAllInspections()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Get All Inspections"
                    />
                    <NavButton
                        onPress={() => handleGetInspectionElements(inspectionId)}
                        iconName="database"
                        iconColor="purple"
                        buttonText="Get Inspection Elements"
                    />

                    <NavButton
                        onPress={() => handleDeleteInspectionElements(inspectionId)}
                        iconName="database"
                        iconColor="red"
                        buttonText="Delete Inspection Elements"
                    />
                    <NavButton
                        onPress={() => handleSaveInspectionElements()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Save Inspection Elements"
                    />
                    <NavButton
                        onPress={() => handleDeviceElements()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Get Display Elements"
                    />
                    <NavButton
                        onPress={() => handleDeviceElements()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Get And Display Device Elements"
                    />
                    <View style={styles.deviceElement}>
                        <TextTitle text="All Device Elements" />
                        <DropdownElements
                            selectedValue={selectedTypeId}
                            setSelectedValue={setSelectedTypeId}
                            items={deviceElementTypes.map((type) => ({
                                label: type.name,
                                value: type.id,
                            }))}
                        />
                        <DeviceElements
                            deviceElements={deviceElements}
                            selectedTypeId={selectedTypeId}
                        />
                    </View>
                    {inspectionDeviceElementsPositions.map((positionId) => {
                        const filteredElements = inspectionDeviceElements.filter(
                            (element) => element.elementPositionId === positionId,
                        );
                        return (
                            <View style={styles.deviceElement} key={positionId}>
                                <TextTitle text={getPositionName(positionId)} />
                                <InspectionDeviceElements
                                    inspectionDeviceElements={filteredElements}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        marginTop: vw(2),
        backgroundColor: customColors.background,
    },
    deviceElement: {
        gap: 10,
        width: '100%',
        minHeight: 200,
        borderWidth: 2,
        borderColor: customColors.blueDark,
        borderRadius: 10,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: customColors.blueLighter,
    },
});

export default DeviceElementsScreen;
