import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Alert } from 'react-native';
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
import { syncInspectionImagesToS3 } from '../../../database/dataAccess/Command/sqlCommandsS3';

type NavScreenNavigationProp = NavigationProp<any, any>;

interface Props {
    inspection: InspectionUpdate;
    onPress?: (id: string) => void;
    onDelete?: () => void;
}

const InspectionItem: React.FC<Props> = ({ inspection, onPress, onDelete }) => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {isLoading && (
                <Modal transparent={true} animationType="fade" visible={true}>
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                </Modal>
            )}
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
                                        useInspectionStore
                                            .getState()
                                            .setInspectionId(newInspectionId);
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

                        {/* Novo dugme za sinhronizaciju */}
                        <TouchableOpacity
                            style={styles.syncButton}
                            onPress={async (e) => {
                                e.stopPropagation();
                                setIsLoading(true);
                                try {
                                    await syncInspectionImagesToS3(inspection.id);
                                    Alert.alert('Success', 'Images synced successfully.');
                                } catch (error) {
                                    Alert.alert(
                                        'Sync Failed',
                                        error.message || 'An unexpected error occurred.',
                                    );
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                        >
                            <TextMain text="Sync" isBold={true} />
                        </TouchableOpacity>
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
        </>
    );
};

const styles = StyleSheet.create({
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
    syncButton: {
        marginLeft: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: customColors.blueDark,
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default InspectionItem;
