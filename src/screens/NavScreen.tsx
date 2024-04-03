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
} from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables } from '../../database/dataAccess/helpers';
import { DeviceElement, DeviceElementType } from '../../database/types';
import Carousel from '../components/image/Carousel';
import Dropdown from '../components/input/Dropdown';

type NavScreenNavigationProp = NavigationProp<any, any>;

const NavScreen: React.FC = () => {
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

    return (
        <GestureHandlerRootView style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <NavButton
                        onPress={handleNewInspectionPress}
                        iconName="plus"
                        iconColor="yellow"
                        buttonText="Neue Inspektion"
                    />

                    <NavButton
                        onPress={handleAllInspectionsPress}
                        iconName="list"
                        iconColor="#e67e22"
                        buttonText="Alle Inspektionen"
                    />

                    <NavButton
                        onPress={() => console.log('profile')}
                        iconName="user"
                        iconColor="#3498db"
                        buttonText="Profil"
                    />

                    <NavButton
                        onPress={() => console.log('sign-out')}
                        iconName="sign-out"
                        iconColor="red"
                        buttonText="Ausloggen"
                    />

                    <NavButton
                        onPress={() => deleteAllTabless()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Delete All Tables"
                    />

                    <NavButton
                        onPress={() => handleDeviceElementTypes()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Console log Device Element Types"
                    />

                    <NavButton
                        onPress={() => handleDeviceElements()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Get And Display Device Elements"
                    />
                    <Dropdown
                        selectedValue={selectedTypeId}
                        setSelectedValue={setSelectedTypeId}
                        items={deviceElementTypes.map((type) => ({
                            label: type.name,
                            value: type.id,
                        }))} // Convert to number
                        pickerPlaceholder="Select Type"
                    />
                </View>
                <Carousel deviceElements={deviceElements} selectedTypeId={selectedTypeId} />
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
        gap: vw(4),
        marginTop: vw(4),
    },
    image: {
        width: 100,
        height: 100,
    },
    imagesContainer: {
        display: 'flex',
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'column',
        gap: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default NavScreen;
