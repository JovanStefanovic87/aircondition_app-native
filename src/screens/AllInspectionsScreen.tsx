import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getInspections } from '../../database/dataAccess/Query/sqlQueries';
import InspectionItem from '../components/table/InspectionItem';
import { InspectionUpdate } from '../../database/types';
import { useInspectionStore } from '../store/store';
import Dropdown from '../components/input/Dropdown';
import TextMain from '../components/text/TextMain';
import NoResultMessage from '../components/text/NoResultMessage';

type AllInspectionsScreenNavigationProp = NavigationProp<Record<string, object>, string>;

const AllInspectionsScreen = () => {
    const navigation = useNavigation<AllInspectionsScreenNavigationProp>();
    const [inspections, setInspections] = useState<InspectionUpdate[]>([]);
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);
    const [selectedStatus, setSelectedStatus] = useState<number>(0);

    useEffect(() => {
        const fetchInspections = async () => {
            try {
                const inspectionsData = await getInspections();
                const inspections = inspectionsData.map((inspection: InspectionUpdate) => ({
                    ...inspection,
                    inspectionStatusId: inspection.inspectionStatusId || 0,
                }));
                setInspections(inspections);
            } catch (error) {
                console.error('Error fetching inspections:', error);
            }
        };

        fetchInspections();
    }, []);

    const handlePress = (inspectionId: string) => {
        setInspectionId(inspectionId);
        if (inspectionId) {
            navigation.navigate('InspectionBasicDetailsScreen');
        }
    };

    const filteredInspections = inspections.filter(
        (inspection) => inspection.inspectionStatusId === selectedStatus,
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.listContainer}>
                    <Dropdown
                        items={[
                            { label: 'Gestartet inspektionen', value: 0 },
                            { label: 'Vollendet inspektionen', value: 1 },
                            { label: 'Finalized inspektionen', value: 2 },
                            { label: 'Gesperrt inspektionen', value: 3 },
                        ]}
                        selectedValue={selectedStatus}
                        setSelectedValue={(value) => setSelectedStatus(value)}
                    />
                    <View>
                        {filteredInspections.length === 0 ? (
                            <NoResultMessage text="Keine Inspektion" />
                        ) : (
                            filteredInspections.map((inspection: InspectionUpdate) => (
                                <InspectionItem
                                    key={inspection.id}
                                    inspection={inspection}
                                    onPress={() => handlePress(inspection.id)}
                                />
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listContainer: {
        flex: 1,
        gap: 20,
    },
});

export default AllInspectionsScreen;
