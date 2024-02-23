import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getInspections } from '../../database/dataAccess/Query/sqlQueries';
import InspectionItem from '../components/lists/InspectionListItem';
import { Inspection } from '../../database/types';
import { useInspectionStore } from '../store/store';

type AllInspectionsScreenNavigationProp = NavigationProp<any, any>;

const AllInspectionsScreen = () => {
    const navigation = useNavigation<AllInspectionsScreenNavigationProp>();
    const [inspections, setInspections] = useState<any>([]); // for now
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);

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

    const handlePress = (inspectionId: string) => {
        setInspectionId(inspectionId);
        if (inspectionId) {
            navigation.navigate('InspectionBasicDetailsScreen');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {inspections.map((inspection: Inspection) => (
                    <InspectionItem
                        key={inspection.id}
                        inspection={inspection}
                        onPress={() => handlePress(inspection.id)}
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
