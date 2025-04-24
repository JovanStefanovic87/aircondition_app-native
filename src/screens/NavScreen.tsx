import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInspectionStore } from '../store/store';
import NavButton from '../components/buttons/NavButton';
import {
    getAllImageStorages,
    getAllInspectionQuestions,
    getAllQuestions,
    getAllUsers,
    getDeviceElementPositions,
    getDeviceElementTypes,
    getDeviceElements,
    getDeviceStateComponentsElementDevice,
    getInspectionDeviceElements,
    getInspectionDeviceStateByGroupType,
    getInspectionQuestions,
    getInspections,
    getQuestionGroups,
    getQuestionImages,
} from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables } from '../../database/dataAccess/Helper/helpers';
import {
    DeviceElement,
    DeviceElementSortUpdate,
    DeviceElementType,
    InspectionDeviceElementUpdate,
} from '../../database/types';
import {
    deleteInspectionDeviceElement,
    deleteUser,
    saveDeviceElementsSortOrder,
    saveInspectionDeviceElement,
    saveQuestionImage,
} from '../../database/dataAccess/Command/sqlCommands';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getStoredUser, logoutUser } from '../../database/dataAccess/Helper/auth';
import { useAuth } from '../context/AuthContext';

type NavScreenNavigationProp = NavigationProp<any, any>;

const NavScreen: React.FC = () => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);
    const [deviceElements, setDeviceElements] = useState<DeviceElement[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
    const [deviceElementTypes, setDeviceElementTypes] = useState<DeviceElementType[]>([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { setIsLoggedIn } = useAuth();

    const handleNewInspectionPress = () => {
        setInspectionId(null);
        navigation.navigate('InspectionBasicDetailsScreen');
    };

    const handleAllInspectionsPress = () => {
        navigation.navigate('AllInspectionsScreen');
    };

    const handleLogoutUser = async () => {
        await logoutUser();
        setIsLoggedIn(false);
    };

    /* const handleDevicElementsPress = () => {
        navigation.navigate('DeviceElementsScreen');
    }; */

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
        await deleteAllTables(setErrorMessage, setErrorModalVisible);
    };

    const handleGetDeviceElements = async () => {
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
            inspectionId: 'a844e533-042e-4a9f-b6b2-a6aee757e2a5',
            deviceElementId: 3,
            deviceOrder: 2,
            elementPositionId: 2,
        };
        await saveInspectionDeviceElement(record);
    };

    const handleDeleteInspectionElements = async (inspectionId: string) => {
        await deleteInspectionDeviceElement(inspectionId);
    };

    const handleDeviceElementsSortUpdate = async () => {
        const record: DeviceElementSortUpdate[] = [
            {
                id: '0ed46f80-b11b-471c-8296-b34d0b3cb16a',
                deviceOrder: 3,
            },
            {
                id: '81879a7c-24fc-4900-817d-ba703446d08d',
                deviceOrder: 4,
            },
        ];
        await saveDeviceElementsSortOrder(record);
    };

    const handleGetDeviceElementPositions = async () => {
        const deviceElementPositions = await getDeviceElementPositions();
        console.log('----------------------------------------------------');
        console.log('deviceElementPositions: ', deviceElementPositions);
    };

    const handleDeviceByGroupType = async () => {
        const deviceElementTypes = await getInspectionDeviceStateByGroupType('');
        console.log('----------------------------------------------------');
        console.log('InspectionDevicesByGroupType (State of whole device): ', deviceElementTypes);
    };

    const handleGetDeviceElementComponents = async () => {
        const deviceElementComponents = await getDeviceStateComponentsElementDevice();
        console.log('----------------------------------------------------');
        console.log('deviceElementComponents: ', deviceElementComponents);
    };

    const handleGetInspectionQuestions = async () => {
        const questions = await getInspectionQuestions('055eb975-830c-4dca-848e-b812b9791895'); //e1ee1bb5-ee71-4e53-86df-362216ac17f7');
        console.log(
            '----------------------------------------------------------------------------------------------------',
        );
        console.log('questions: ', JSON.stringify(questions));
    };

    const handleGetAllInspectionQuestions = async () => {
        const inspectionQuestions = await getAllInspectionQuestions();
        console.log('----------------------------------------------------');
        console.log('inspectionQuestions: ', inspectionQuestions);
    };

    const handleAllQuestions = async () => {
        const questions = await getAllQuestions();
        console.log('----------------------------------------------------');
        console.log('questions: ', questions);
    };

    const handleGetQuestionGroups = async () => {
        const questionGroups = await getQuestionGroups();
        console.log('----------------------------------------------------');
        console.log('questionGroups: ', questionGroups);
    };

    const handleSaveQuestionImage = async () => {
        saveQuestionImage('32c3a2b3-e848-4246-ad83-d3bf7154b9fe', {
            name: 'test',
            storagePath:
                'file:///data/user/0/com.inspectionapp/cache/ReactNative_cropped_image_1617902862374.jpg',
        });
    };

    const handleGetAllQuestionImages = async () => {
        const images = await getQuestionImages('32c3a2b3-e848-4246-ad83-d3bf7154b9fe');
        console.log('images: ', images);
    };

    const handleAllImages = async () => {
        const images = await getAllImageStorages();
        console.log('images: ', images);
    };

    const handleCheckSession = async () => {
        const user = await getStoredUser();
        console.log('user: ', user);
    };

    const handleGetAllUsers = async () => {
        const users = await getAllUsers();
        console.log('users: ', users);
    };

    const handleDeleteUser = async () => {
        await deleteUser('fc57127b-b273-4323-b0e6-48f430f8137c');
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
                        onPress={handleLogoutUser}
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
                        onPress={handleCheckSession}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="Get Session"
                    />

                    <NavButton
                        onPress={handleGetAllUsers}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="Get All Users"
                    />

                    <NavButton
                        onPress={handleDeleteUser}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="Delete Users"
                    />
                    {/*
                    <NavButton
                        onPress={handleSaveQuestionImage}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="Save Question Image"
                    />
                    <NavButton
                        onPress={handleGetAllQuestionImages}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="Get Question Images"
                    />

                    <NavButton
                        onPress={handleAllImages}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="Get All Images"
                    />

                    <NavButton
                        onPress={handleDeviceByGroupType}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="DeviceElements"
                    />
                    
                       <NavButton
                        onPress={handleDeviceByGroupType}
                        iconName="microchip"
                        iconColor="red"
                        buttonText="DeviceElements"
                    />
                    <NavButton
                        onPress={() => handleGetAllInspections()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Get All Inspections"
                    />
                    <NavButton
                        onPress={() =>
                            handleGetInspectionElements('a844e533-042e-4a9f-b6b2-a6aee757e2a5')
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
                        onPress={() => handleGetDeviceElements()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Get All Elements"
                    />
                    <NavButton
                        onPress={() => handleDeviceElementsSortUpdate()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Update Elements Sort Order"
                    />
                    <NavButton
                        onPress={() => handleGetDeviceElementPositions()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Element Positions"
                    />
                    <NavButton
                        onPress={() => handleGetDeviceElementComponents()}
                        iconName="database"
                        iconColor="blue"
                        buttonText="Get Device Element Components"
                    />
                    <NavButton
                        onPress={() => handleGetInspectionQuestions()}
                        iconName="database"
                        iconColor="blue"
                        buttonText="Get Questions per specific Inspection"
                    />
                    <NavButton
                        onPress={() => handleGetAllInspectionQuestions()}
                        iconName="database"
                        iconColor="blue"
                        buttonText="Get All Inspection Questions"
                    />
                    <NavButton
                        onPress={() => handleAllQuestions()}
                        iconName="database"
                        iconColor="blue"
                        buttonText="Get All Questions"
                    />

                    <NavButton
                        onPress={() => handleGetQuestionGroups()}
                        iconName="database"
                        iconColor="blue"
                        buttonText="Get All Question Groups"
                    /> */}
                </View>
                <ErrorInformationModal
                    visible={errorModalVisible}
                    message={errorMessage}
                    onClose={() => setErrorModalVisible(false)}
                />
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
