import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';
import { customColors } from '../../assets/styles/customStyles';
import { InspectionUpdate } from '../../../database/types';
import TextMain from '../text/TextMain';
import PdfButton from '../buttons/PdfButton';
import EditButton from '../buttons/EditButton';
import DuplicateButton from '../buttons/DuplicateButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { copyInspection } from '../../../database/dataAccess/Command/sqlCommands';
import { useInspectionStore } from '../../store/store';
import DeleteButton from '../buttons/DeleteButton';

type NavScreenNavigationProp = NavigationProp<any, any>;

interface Props {
    inspection: InspectionUpdate;
    onPress?: (id: string) => void;
    onDelete?: () => void;
}

const InspectionItem: React.FC<Props> = ({ inspection, onPress, onDelete }) => {
    const navigation = useNavigation<NavScreenNavigationProp>();

    return (
        <View style={styles.inspectionItem}>
            <View style={styles.actionsContainer}>
                <View style={styles.actionRow}>
                    <PdfButton
                        onPress={(e) => {
                            e.stopPropagation();
                            navigation.navigate('PdfViewerScreen', {
                                inspectionId: inspection.id,
                            });
                        }}
                    />

                    <DuplicateButton
                        onPress={async (e) => {
                            e.stopPropagation();
                            try {
                                const newInspectionId = await copyInspection(inspection.id);
                                if (newInspectionId) {
                                    useInspectionStore.getState().setInspectionId(newInspectionId);
                                    navigation.navigate('InspectionBasicDetailsScreen', {
                                        inspectionId: newInspectionId,
                                    });
                                }
                            } catch (error) {
                                console.error('Error duplicating inspection:', error);
                            }
                        }}
                    />

                    <EditButton
                        onPress={() => {
                            useInspectionStore.getState().setInspectionId(inspection.id);
                            navigation.navigate('InspectionBasicDetailsScreen', {
                                inspectionId: inspection.id,
                            });
                        }}
                    />

                    <DeleteButton
                        onPress={() => {
                            if (onDelete) onDelete();
                        }}
                    />
                </View>
                <View style={styles.flexEnd}>
                    {inspection.inspectionStatusId ? <CheckedIcon /> : <DangerIcon />}
                </View>
            </View>

            <TouchableOpacity style={styles.infoContainer}>
                <View style={styles.flexContainer}>
                    <TextMain text="Name der Anlage: " isBold={true} />
                    <TextMain text={inspection.facilityName} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Ausstellungsort: " isBold={true} />
                    <TextMain text={inspection.location} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Anlage-Id: " isBold={true} />
                    <TextMain text={inspection.barcode} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Nummer der Leistungsnachweis: " isBold={true} />
                    <TextMain text={inspection.contractNumber} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
    },
    flexEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    inspectionItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: customColors.blueLighter,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoContainer: {
        paddingVertical: 10,
        gap: 6,
    },
});

export default InspectionItem;
