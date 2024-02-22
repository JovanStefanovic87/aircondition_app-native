import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { getInspections } from '../../database/dataAccess/Query/sqlQueries';
import InspectionItem from '../components/lists/InspectionListItem';
import { Inspection } from '../../database/types';

const AllInspectionsScreen = () => {
    const [inspections, setInspections] = useState<any>([]); // for now

    useEffect(() => {
        const fetchInspections = async () => {
            try {
                const inspectionsData = await getInspections();
                const inspectionsWithStatus = inspectionsData.map((inspection) => ({
                    ...inspection,
                    status: Math.random() < 0.5,
                }));
                setInspections(inspectionsWithStatus);
            } catch (error) {
                console.error('Error fetching inspections:', error);
            }
        };

        fetchInspections();
    }, []);

    const handlePress = (inspectionId) => {
        // Handle navigation or any other action when an inspection item is pressed
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {inspections.map((inspection) => (
                    <InspectionItem
                        key={inspection.id}
                        inspection={inspection}
                        onPress={handlePress}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default AllInspectionsScreen;
