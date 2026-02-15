import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
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
    getDBVersionTable,
    getInspectionStatus,
} from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables, getAllTables } from '../../database/dataAccess/Helper/helpers';
import { getStoredUser } from '../../database/dataAccess/Helper/auth';
import {
    copyInspection,
    deleteInspectionDeviceElement,
    saveDeviceElementsSortOrder,
    saveInspectionDeviceElement,
    saveQuestionImage,
} from '../../database/dataAccess/Command/sqlCommands';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { uploadSqliteBackupToS3 } from '../api/uploadSqliteBackupToS3';
import { deleteLocalDatabase } from '../../database/dbConnection/initDatabase';

type NavScreenNavigationProp = NavigationProp<any, any>;

const DevToolsScreen: React.FC = () => {
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const navigation = useNavigation<NavScreenNavigationProp>();

    const inspectionId = '39827eeb-5f1c-4a82-a8fc-1685c5ddae0c';

    const log = (value: any) => {
        const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);

        console.log(value);

        setMessages((prev) => [`[${new Date().toLocaleTimeString()}] ${text}`, ...prev]);
    };

    const handle = {
        deleteAllTables: async () => await deleteAllTables(setErrorMessage, setErrorModalVisible),
        getAllTables: async () => {
            const tables = await getAllTables();
            for (const table of tables) {
                log(`Table: ${table}`);
            }
        },
        getDBVersion: async () => {
            const version = await getDBVersionTable();
            log(`DB Version: ${JSON.stringify(version)}`);
        },
        getSession: async () => log(await getStoredUser()),
        saveQuestionImage: async () =>
            await saveQuestionImage('id', {
                name: 'test',
                storagePath: 'file://example.jpg',
            }),
        getQuestionImages: async () => log(await getInspectionQuestionImages('id')),
        getAllImages: async () => log(await getAllImageStorages()),
        getAllInspectionImages: async () => log(await getAllInspectionImages(inspectionId)),
        getInspectionStatus: async () => log(await getInspectionStatus(inspectionId)),
        deviceByGroupType: async () => log(await getInspectionDeviceStateByGroupType('')),
        getAllInspections: async () => log(await getInspections()),
        getInspectionElements: async () => log(await getInspectionDeviceElements(inspectionId)),
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
        getDeviceElementPositions: async () => log(await getDeviceElementPositions()),
        getElementComponents: async () => log(await getDeviceStateComponentsElementDevice()),
        getInspectionQuestions: async () => log(await getInspectionQuestions('some-id')),
        getAllInspectionQuestions: async () => log(await getAllInspectionQuestions()),
        getAllQuestions: async () => log(await getAllQuestions()),
        getQuestionGroups: async () => log(await getQuestionGroups()),
        getInspectionElementStateDetails: async () =>
            log(await getInspectionElementStateDetails(inspectionId, '')),
        copyInspection: async () => {
            const newInspectionId = await copyInspection(inspectionId);
            log(
                newInspectionId
                    ? `New inspection copied with ID: ${newInspectionId}`
                    : 'Failed to copy inspection',
            );
        },
        uploadSqliteBackupToS3: async () => {
            const session = await getStoredUser();
            try {
                const result = await uploadSqliteBackupToS3(session ? session.username : 'unknown');

                log(`Backup uploaded to S3: ${JSON.stringify(result)}`);
            } catch (error) {
                log(`Error uploading backup: ${error}`);
            }
        },
        deleteLocalDatabase: async () => {
            try {
                await deleteLocalDatabase();
                log('Local database deleted successfully.');
            } catch (error) {
                log(`Error deleting local database: ${error}`);
            }
        },
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    {__DEV__ && (
                        <>
                            <NavButton
                                buttonText="Delete All Tables"
                                iconName="database"
                                iconColor="red"
                                onPress={handle.deleteAllTables}
                            />
                            <NavButton
                                buttonText="Delete Local Database"
                                iconName="database"
                                iconColor="red"
                                onPress={handle.deleteLocalDatabase}
                            />
                            <NavButton
                                buttonText="Get All Tables"
                                iconName="database"
                                iconColor="red"
                                onPress={handle.getAllTables}
                            />
                            <NavButton
                                buttonText="Get DB Version"
                                iconName="database"
                                iconColor="red"
                                onPress={handle.getDBVersion}
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
                                buttonText="Get Inspection Status"
                                iconName="database"
                                iconColor="red"
                                onPress={handle.getInspectionStatus}
                            />
                            <NavButton
                                buttonText="Get All Inspection Images"
                                iconName="database"
                                iconColor="red"
                                onPress={handle.getAllInspectionImages}
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
                        </>
                    )}
                    <NavButton
                        buttonText="Database Backup to S3"
                        iconName="upload"
                        iconColor="blue"
                        onPress={handle.uploadSqliteBackupToS3}
                    />
                </ScrollView>

                <ScrollView style={styles.logContainer}>
                    {messages.map((msg, index) => (
                        <Text key={index} style={styles.logText}>
                            {msg}
                        </Text>
                    ))}
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
    container: {
        paddingVertical: 20,
        gap: vw(4),
        alignItems: 'center',
    },
    logContainer: {
        maxHeight: 250,
        borderTopWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: '#111',
    },
    logText: {
        color: '#0f0',
        fontSize: 12,
        marginBottom: 6,
    },
});

export default DevToolsScreen;

// import React, { useState } from 'react';
// import { ScrollView, View, StyleSheet } from 'react-native';
// import { vw } from 'react-native-css-vh-vw';
// import NavButton from '../components/buttons/NavButton';
// import {
//     getAllImageStorages,
//     getDeviceElementPositions,
//     getInspectionDeviceStateByGroupType,
//     getDeviceStateComponentsElementDevice,
//     getInspectionQuestions,
//     getAllInspectionQuestions,
//     getAllQuestions,
//     getQuestionGroups,
//     getInspectionQuestionImages,
//     getAllUsers,
//     getInspectionDeviceElements,
//     getInspections,
//     getInspectionElementStateDetails,
//     getAllInspectionImages,
// } from '../../database/dataAccess/Query/sqlQueries';
// import { deleteAllTables } from '../../database/dataAccess/Helper/helpers';
// import { getStoredUser } from '../../database/dataAccess/Helper/auth';
// import {
//     copyInspection,
//     deleteInspectionDeviceElement,
//     saveDeviceElementsSortOrder,
//     saveInspectionDeviceElement,
//     saveQuestionImage,
// } from '../../database/dataAccess/Command/sqlCommands';
// import ErrorInformationModal from '../components/modals/ErrorInformationModal';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationProp, useNavigation } from '@react-navigation/native';

// type NavScreenNavigationProp = NavigationProp<any, any>;

// const DevToolsScreen: React.FC = () => {
//     const [errorModalVisible, setErrorModalVisible] = useState(false);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const navigation = useNavigation<NavScreenNavigationProp>();

//     const inspectionId = '7610aad5-691e-4ddf-80ed-f6e794246aac';

//     const handle = {
//         deleteAllTables: async () => await deleteAllTables(setErrorMessage, setErrorModalVisible),
//         getSession: async () => console.log(await getStoredUser()),
//         saveQuestionImage: async () =>
//             await saveQuestionImage('id', {
//                 name: 'test',
//                 storagePath: 'file://example.jpg',
//             }),
//         getQuestionImages: async () => console.log(await getInspectionQuestionImages('id')),
//         getAllImages: async () => console.log(await getAllImageStorages()),
//         getAllInspectionImages: async () => console.log(await getAllInspectionImages(inspectionId)),
//         deviceByGroupType: async () => console.log(await getInspectionDeviceStateByGroupType('')),
//         getAllInspections: async () => console.log(await getInspections()),
//         getInspectionElements: async () =>
//             console.log(await getInspectionDeviceElements(inspectionId)),
//         deleteInspectionElements: async () =>
//             await deleteInspectionDeviceElement('da3ae5e2-e8f8-42e6-87d2-2ae8d834b3f6'),
//         saveInspectionElements: async () =>
//             await saveInspectionDeviceElement({
//                 inspectionId: inspectionId,
//                 deviceElementId: 3,
//                 deviceOrder: 2,
//                 elementPositionId: 2,
//             }),
//         updateElementSortOrder: async () =>
//             await saveDeviceElementsSortOrder([
//                 { id: 'id1', deviceOrder: 3 },
//                 { id: 'id2', deviceOrder: 4 },
//             ]),
//         getDeviceElementPositions: async () => console.log(await getDeviceElementPositions()),
//         getElementComponents: async () =>
//             console.log(await getDeviceStateComponentsElementDevice()),
//         getInspectionQuestions: async () => console.log(await getInspectionQuestions('some-id')),
//         getAllInspectionQuestions: async () => console.log(await getAllInspectionQuestions()),
//         getAllQuestions: async () => console.log(await getAllQuestions()),
//         getQuestionGroups: async () => console.log(await getQuestionGroups()),
//         getInspectionElementStateDetails: async () =>
//             console.log(await getInspectionElementStateDetails(inspectionId, '')),
//         copyInspection: async () => {
//             const newInspectionId = await copyInspection(inspectionId);
//             if (newInspectionId) {
//                 console.log(`New inspection copied with ID: ${newInspectionId}`);
//             } else {
//                 console.log('Failed to copy inspection');
//             }
//         },
//     };

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <View style={{ flex: 1 }}>
//                 <ScrollView contentContainerStyle={styles.container}>
//                     <NavButton
//                         buttonText="Delete All Tables"
//                         iconName="database"
//                         iconColor="red"
//                         onPress={handle.deleteAllTables}
//                     />

//                     <>
//                         <NavButton
//                             buttonText="JS Report PDF Viewer"
//                             iconName="file-pdf-o"
//                             iconColor="blue"
//                             onPress={() =>
//                                 navigation.navigate('PdfViewerScreen', {
//                                     inspectionId: '',
//                                 })
//                             }
//                         />
//                         <NavButton
//                             buttonText="Get Session"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getSession}
//                         />
//                         <NavButton
//                             buttonText="Save Question Image"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.saveQuestionImage}
//                         />
//                         <NavButton
//                             buttonText="Get Question Images"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getQuestionImages}
//                         />
//                         <NavButton
//                             buttonText="Get All Images"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getAllImages}
//                         />
//                         <NavButton
//                             buttonText="Get All Inspection Images"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getAllInspectionImages}
//                         />
//                         <NavButton
//                             buttonText="Device Elements by Group Type"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.deviceByGroupType}
//                         />
//                         <NavButton
//                             buttonText="Get All Inspections"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getAllInspections}
//                         />
//                         <NavButton
//                             buttonText="Copy Inspection"
//                             iconName="copy"
//                             iconColor="blue"
//                             onPress={handle.copyInspection}
//                         />

//                         <NavButton
//                             buttonText="Get Inspection Elements"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getInspectionElements}
//                         />
//                         <NavButton
//                             buttonText="Delete Inspection Elements"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.deleteInspectionElements}
//                         />
//                         <NavButton
//                             buttonText="Save Inspection Elements"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.saveInspectionElements}
//                         />
//                         <NavButton
//                             buttonText="Update Element Sort Order"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.updateElementSortOrder}
//                         />
//                         <NavButton
//                             buttonText="Get Element Positions"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getDeviceElementPositions}
//                         />
//                         <NavButton
//                             buttonText="Get Element Components"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getElementComponents}
//                         />
//                         <NavButton
//                             buttonText="Get Inspection Questions"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getInspectionQuestions}
//                         />
//                         <NavButton
//                             buttonText="Get All Inspection Questions"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getAllInspectionQuestions}
//                         />
//                         <NavButton
//                             buttonText="Get All Questions"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getAllQuestions}
//                         />
//                         <NavButton
//                             buttonText="Get Question Groups"
//                             iconName="database"
//                             iconColor="red"
//                             onPress={handle.getQuestionGroups}
//                         />
//                         <NavButton
//                             buttonText="Get Element State Details - Step 4"
//                             iconName="sign-in"
//                             iconColor="green"
//                             onPress={handle.getInspectionElementStateDetails}
//                         />
//                     </>
//                 </ScrollView>

//                 <ErrorInformationModal
//                     visible={errorModalVisible}
//                     message={errorMessage}
//                     onClose={() => setErrorModalVisible(false)}
//                 />
//             </View>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollContainer: {
//         alignItems: 'center',
//     },
//     container: {
//         paddingVertical: 20,
//         gap: vw(4),
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default DevToolsScreen;
