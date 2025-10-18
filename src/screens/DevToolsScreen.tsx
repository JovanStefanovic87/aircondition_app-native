import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import NavButton from '../components/buttons/NavButton';
import {
    getAllImageStorages,
    getDeviceElementPositions,
    getInspectionDeviceStateByGroupType,
    getDeviceStateComponentsElementDevice,
    getInspectionQuestions,
    getAllInspectionQuestions,
    getAllQuestions,
    getQuestionGroups,
    getInspectionQuestionImages,
    getAllUsers,
    getInspectionDeviceElements,
    getInspections,
    getInspectionElementStateDetails,
    getAllInspectionImages,
} from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables } from '../../database/dataAccess/Helper/helpers';
import { getStoredUser } from '../../database/dataAccess/Helper/auth';
import {
    copyInspection,
    deleteInspectionDeviceElement,
    deleteUser,
    saveDeviceElementsSortOrder,
    saveInspectionDeviceElement,
    saveQuestionImage,
    syncInspectionImagesToS3,
} from '../../database/dataAccess/Command/sqlCommands';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { uploadImagesToCloudS3 } from '../api/s3ImageUpload';

type NavScreenNavigationProp = NavigationProp<any, any>;

const DevToolsScreen: React.FC = () => {
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigation = useNavigation<NavScreenNavigationProp>();

    const inspectionId = '7610aad5-691e-4ddf-80ed-f6e794246aac';

    const handle = {
        deleteAllTables: async () => await deleteAllTables(setErrorMessage, setErrorModalVisible),
        getSession: async () => console.log(await getStoredUser()),
        saveQuestionImage: async () =>
            await saveQuestionImage('id', {
                name: 'test',
                storagePath: 'file://example.jpg',
            }),
        getQuestionImages: async () => console.log(await getInspectionQuestionImages('id')),
        getAllImages: async () => console.log(await getAllImageStorages()),
        getAllInspectionImages: async () => console.log(await getAllInspectionImages(inspectionId)),
        saveImagesToS3: async () => {
            const images = await syncInspectionImagesToS3(inspectionId);
            console.log('Images uploaded to S3:', images);
        },
        deviceByGroupType: async () => console.log(await getInspectionDeviceStateByGroupType('')),
        getAllInspections: async () => console.log(await getInspections()),
        getInspectionElements: async () =>
            console.log(await getInspectionDeviceElements(inspectionId)),
        deleteInspectionElements: async () =>
            await deleteInspectionDeviceElement('da3ae5e2-e8f8-42e6-87d2-2ae8d834b3f6'),
        saveInspectionElements: async () =>
            await saveInspectionDeviceElement({
                inspectionId: inspectionId,
                deviceElementId: 3,
                deviceOrder: 2,
                elementPositionId: 2,
            }),
        updateElementSortOrder: async () =>
            await saveDeviceElementsSortOrder([
                { id: 'id1', deviceOrder: 3 },
                { id: 'id2', deviceOrder: 4 },
            ]),
        getDeviceElementPositions: async () => console.log(await getDeviceElementPositions()),
        getElementComponents: async () =>
            console.log(await getDeviceStateComponentsElementDevice()),
        getInspectionQuestions: async () => console.log(await getInspectionQuestions('some-id')),
        getAllInspectionQuestions: async () => console.log(await getAllInspectionQuestions()),
        getAllQuestions: async () => console.log(await getAllQuestions()),
        getQuestionGroups: async () => console.log(await getQuestionGroups()),
        getInspectionElementStateDetails: async () =>
            console.log(await getInspectionElementStateDetails(inspectionId, '')),
        copyInspection: async () => {
            const newInspectionId = await copyInspection(inspectionId);
            if (newInspectionId) {
                console.log(`New inspection copied with ID: ${newInspectionId}`);
            } else {
                console.log('Failed to copy inspection');
            }
        },
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <NavButton
                        buttonText="Delete All Tables"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.deleteAllTables}
                    />
                    <NavButton
                        buttonText="JS Report PDF Viewer"
                        iconName="file-pdf-o"
                        iconColor="blue"
                        onPress={() =>
                            navigation.navigate('PdfViewerScreen', {
                                inspectionId: '',
                            })
                        }
                    />
                    <NavButton
                        buttonText="Get Session"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getSession}
                    />
                    <NavButton
                        buttonText="Save Question Image"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.saveQuestionImage}
                    />
                    <NavButton
                        buttonText="Get Question Images"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getQuestionImages}
                    />
                    <NavButton
                        buttonText="Get All Images"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getAllImages}
                    />
                    <NavButton
                        buttonText="Get All Inspection Images"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getAllInspectionImages}
                    />
                    <NavButton
                        buttonText="Save Images to S3"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.saveImagesToS3}
                    />
                    <NavButton
                        buttonText="Device Elements by Group Type"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.deviceByGroupType}
                    />
                    <NavButton
                        buttonText="Get All Inspections"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getAllInspections}
                    />
                    <NavButton
                        buttonText="Copy Inspection"
                        iconName="copy"
                        iconColor="blue"
                        onPress={handle.copyInspection}
                    />

                    <NavButton
                        buttonText="Get Inspection Elements"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getInspectionElements}
                    />
                    <NavButton
                        buttonText="Delete Inspection Elements"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.deleteInspectionElements}
                    />
                    <NavButton
                        buttonText="Save Inspection Elements"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.saveInspectionElements}
                    />
                    <NavButton
                        buttonText="Update Element Sort Order"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.updateElementSortOrder}
                    />
                    <NavButton
                        buttonText="Get Element Positions"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getDeviceElementPositions}
                    />
                    <NavButton
                        buttonText="Get Element Components"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getElementComponents}
                    />
                    <NavButton
                        buttonText="Get Inspection Questions"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getInspectionQuestions}
                    />
                    <NavButton
                        buttonText="Get All Inspection Questions"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getAllInspectionQuestions}
                    />
                    <NavButton
                        buttonText="Get All Questions"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getAllQuestions}
                    />
                    <NavButton
                        buttonText="Get Question Groups"
                        iconName="database"
                        iconColor="red"
                        onPress={handle.getQuestionGroups}
                    />
                    <NavButton
                        buttonText="Get Element State Details - Step 4"
                        iconName="sign-in"
                        iconColor="green"
                        onPress={handle.getInspectionElementStateDetails}
                    />
                </ScrollView>

                <ErrorInformationModal
                    visible={errorModalVisible}
                    message={errorMessage}
                    onClose={() => setErrorModalVisible(false)}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
    },
    container: {
        paddingVertical: 20,
        gap: vw(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DevToolsScreen;
