import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInspectionStore } from '../store/store';
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
import Carousel from '../components/image/Carousel';
import Dropdown from '../components/input/Dropdown';
import {
    deleteInspectionDeviceElement,
    saveInspectionDeviceElement,
} from '../../database/dataAccess/Command/sqlCommands';
import { customColors } from '../assets/styles/customStyles';
import TextTitle from '../components/text/TextTitle';
import CarouselIncluded from '../components/image/CarouselIncluded';

type NavScreenNavigationProp = NavigationProp<any, any>;

const DeviceElementsScreen: React.FC = () => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);
    const [deviceElements, setDeviceElements] = useState<DeviceElement[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
    const [deviceElementTypes, setDeviceElementTypes] = useState<DeviceElementType[]>([]);

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
        const fetchDeviceElementTypes = async () => {
            try {
                const elementTypes = await getDeviceElementTypes();

                setDeviceElementTypes(elementTypes);
            } catch (error) {
                console.error('Error fetching device element types:', error);
            }
        };

        fetchDeviceElementTypes();
    }, []);

    const deleteAllTabless = async () => {
        await deleteAllTables();
    };

    const handleDeviceElements = async () => {
        const elements = await getDeviceElements();
        console.log('----------------------------------------------------');
        console.log('elements: ', elements);
        setDeviceElements(elements);
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
            inspectionId: '674bfb70-bc98-40c8-9b54-0156080648c5',
            deviceElementId: 1,
            deviceOrder: 1,
        };
        await saveInspectionDeviceElement(record);
    };

    const handleDeleteInspectionElements = async (inspectionId: string) => {
        await deleteInspectionDeviceElement(inspectionId);
    };

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
                        onPress={() =>
                            handleGetInspectionElements('674bfb70-bc98-40c8-9b54-0156080648c5')
                        }
                        iconName="database"
                        iconColor="red"
                        buttonText="Get Inspection Elements"
                    />

                    <NavButton
                        onPress={() =>
                            handleDeleteInspectionElements('da3ae5e2-e8f8-42e6-87d2-2ae8d834b3f6')
                        }
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
                        <Dropdown
                            selectedValue={selectedTypeId}
                            setSelectedValue={setSelectedTypeId}
                            items={deviceElementTypes.map((type) => ({
                                label: type.name,
                                value: type.id,
                            }))}
                        />
                        <Carousel deviceElements={deviceElements} selectedTypeId={selectedTypeId} />
                    </View>
                    <View style={styles.deviceElement}>
                        <TextTitle text="Zonen Davor" />
                        <Dropdown
                            selectedValue={selectedTypeId}
                            setSelectedValue={setSelectedTypeId}
                            items={deviceElementTypes.map((type) => ({
                                label: type.name,
                                value: type.id,
                            }))}
                        />
                        <CarouselIncluded
                            deviceElements={deviceElements}
                            selectedTypeId={selectedTypeId}
                        />
                    </View>
                    <View style={styles.deviceElement}>
                        <TextTitle text="Anlage" />
                        <Dropdown
                            selectedValue={selectedTypeId}
                            setSelectedValue={setSelectedTypeId}
                            items={deviceElementTypes.map((type) => ({
                                label: type.name,
                                value: type.id,
                            }))}
                        />
                        <CarouselIncluded
                            deviceElements={deviceElements}
                            selectedTypeId={selectedTypeId}
                        />
                    </View>
                    <View style={styles.deviceElement}>
                        <TextTitle text="Zonen" />
                        <Dropdown
                            selectedValue={selectedTypeId}
                            setSelectedValue={setSelectedTypeId}
                            items={deviceElementTypes.map((type) => ({
                                label: type.name,
                                value: type.id,
                            }))}
                        />
                        <CarouselIncluded
                            deviceElements={deviceElements}
                            selectedTypeId={selectedTypeId}
                        />
                    </View>
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
