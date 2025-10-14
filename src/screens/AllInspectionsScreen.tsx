import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getInspections } from '../../database/dataAccess/Query/sqlQueries';
import { deleteInspection } from '../../database/dataAccess/Command/sqlCommands';
import InspectionItem from '../components/table/InspectionItem';
import { InspectionUpdate } from '../../database/types';
import { useInspectionStore } from '../store/store';
import Dropdown from '../components/input/DropdownWithValidation';
import NoResultMessage from '../components/text/NoResultMessage';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';
import Icon from 'react-native-vector-icons/Ionicons'; // ✅ koristi react-native-vector-icons

type AllInspectionsScreenNavigationProp = NavigationProp<Record<string, object>, string>;

const AllInspectionsScreen = () => {
    const navigation = useNavigation<AllInspectionsScreenNavigationProp>();
    const [inspections, setInspections] = useState<InspectionUpdate[]>([]);
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);
    const [selectedStatus, setSelectedStatus] = useState<number>(0);

    // Modal state
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [inspectionToDelete, setInspectionToDelete] = useState<string | null>(null);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('NavScreen' as never)}>
                    <Icon name="arrow-back" size={24} color="white" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const fetchInspections = useCallback(async () => {
        try {
            const inspectionsData = await getInspections();
            const inspections = inspectionsData.map((inspection: InspectionUpdate) => ({
                ...inspection,
                inspectionStatusId: inspection.inspectionStatusId || 0,
            }));
            setInspections(inspections);
        } catch (error: any) {
            setErrorMessage(error.message);
            setErrorModalVisible(true);
        }
    }, []);

    useEffect(() => {
        fetchInspections();
    }, [fetchInspections]);

    const handlePress = (inspectionId: string) => {
        setInspectionId(inspectionId);
        if (inspectionId) {
            navigation.navigate('InspectionBasicDetailsScreen');
        }
    };

    const confirmDelete = (inspectionId: string) => {
        setInspectionToDelete(inspectionId);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (!inspectionToDelete) return;
        try {
            await deleteInspection(inspectionToDelete);
            setDeleteModalVisible(false);
            setInspectionToDelete(null);
            await fetchInspections(); // refresh liste
        } catch (error: any) {
            setDeleteModalVisible(false);
            setErrorMessage(error.message);
            setErrorModalVisible(true);
        }
    };

    const filteredInspections = inspections.filter(
        (inspection) => inspection.inspectionStatusId === selectedStatus,
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.listContainer}>
                    <View style={styles.headerOptions}>
                        <View style={styles.dropdownWrapper}>
                            <Dropdown
                                items={[
                                    { label: 'Gestartet Inspektionen', value: 0 },
                                    { label: 'Vollendet Inspektionen', value: 1 },
                                    { label: 'Finalisiert Inspektionen', value: 2 },
                                    { label: 'Gesperrt Inspektionen', value: 3 },
                                ]}
                                selectedValue={selectedStatus}
                                setSelectedValue={(value) => setSelectedStatus(value)}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => {
                                setInspectionId(null);
                                navigation.navigate('InspectionBasicDetailsScreen');
                            }}
                        >
                            <Icon name="add" size={28} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        {filteredInspections.length === 0 ? (
                            <NoResultMessage text="Keine Inspektion" />
                        ) : (
                            filteredInspections.map((inspection: InspectionUpdate) => (
                                <InspectionItem
                                    key={inspection.id}
                                    inspection={inspection}
                                    onPress={() => handlePress(inspection.id)}
                                    onDelete={() => confirmDelete(inspection.id)}
                                />
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                modalVisible={deleteModalVisible}
                hideModal={() => setDeleteModalVisible(false)}
                handleConfirmDelete={handleConfirmDelete}
            />

            {/* Error Information Modal */}
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
        padding: 20,
    },
    headerOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    dropdownWrapper: {
        flex: 1,
    },
    iconButton: {
        height: 44,
        width: 50,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
    },
});

export default AllInspectionsScreen;
