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
import {
    copyInspection,
    updateInspectionStatus,
} from '../../../database/dataAccess/Command/sqlCommands';
import { useInspectionStore } from '../../store/store';
import DeleteButton from '../buttons/DeleteButton';
import { syncInspectionImagesToS3 } from '../../../database/dataAccess/Command/sqlCommandsS3';
import LockButton from '../buttons/LockButton';

type NavScreenNavigationProp = NavigationProp<any, any>;

interface Props {
    inspection: InspectionUpdate;
    onPress?: (id: string) => void;
    onDelete?: () => void;
    onStatusChange?: () => void;
}

const InspectionItem: React.FC<Props> = ({ inspection, onPress, onDelete, onStatusChange }) => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    const [isLoading, setIsLoading] = useState(false);

    const getNextInspectionStatus = (inspection) => {
        const isLocked = inspection.inspectionStatusId === 4;
        const canBeLocked = inspection.inspectionTypeId === 2 || inspection.inspectionTypeId === 3;

        if (isLocked) return 2;
        if (canBeLocked) return 4;

        return null;
    };

    const executeStatusChange = async (inspection, nextStatus) => {
        setIsLoading(true);
        try {
            await updateInspectionStatus(inspection.id, nextStatus);

            Alert.alert(
                'Erfolg', // 'Success',
                nextStatus === 4 ? 'Inspektionsstatus gesperrt.' : 'Inspektionsstatus entsperrt.', // 'Inspection status locked/unlocked.'
            );
            if (onStatusChange) onStatusChange();
        } catch (error) {
            Alert.alert(
                'Fehler', // 'Error',
                nextStatus === 4
                    ? 'Status konnte nicht gesperrt werden.' // 'Status could not be locked.'
                    : 'Status konnte nicht entsperrt werden.', // 'Status could not be unlocked.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const confirmStatusChange = (inspection, nextStatus) => {
        const locking = nextStatus === 4;

        Alert.alert(
            locking ? 'Bestätigung' : 'Entsperren bestätigen', // 'Confirm Locking' : 'Confirm Unlocking'
            locking
                ? 'Möchten Sie den Inspektionsstatus sperren?' // 'Do you want to lock the inspection status?'
                : 'Möchten Sie den Inspektionsstatus entsperren?', // 'Do you want to unlock the inspection status?'
            [
                { text: 'Abbrechen', style: 'cancel' }, // 'Cancel'
                {
                    text: 'Bestätigen', // 'Confirm'
                    onPress: () => executeStatusChange(inspection, nextStatus),
                },
            ],
        );
    };

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
                            onPress={async (e) => {
                                e.stopPropagation();
                                try {
                                    await syncInspectionImagesToS3(inspection.id);
                                    Alert.alert(
                                        'Erfolg', // 'Success',
                                        'Bilder erfolgreich synchronisiert.', // 'Images synced successfully.'
                                    );
                                } catch (error) {
                                    const nothingToSync =
                                        error.message === 'Nichts zum Synchronisieren';
                                    if (nothingToSync) {
                                        console.log(
                                            'No images to sync for inspection:',
                                            inspection.id,
                                        );
                                    } else {
                                        Alert.alert(
                                            'Synchronisierung fehlgeschlagen', // 'Sync Failed'
                                            error.message ||
                                                'Ein unerwarteter Fehler ist aufgetreten.', // 'An unexpected error occurred.'
                                        );
                                    }
                                } finally {
                                    setIsLoading(false);
                                }

                                setTimeout(() => {
                                    navigation.navigate('PdfViewerScreen', {
                                        inspectionId: inspection.id,
                                    });
                                }, 2000);
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

                        {/* Dugme za otkljucavanje i zakljucavanje inspekcije */}
                        <LockButton
                            locked={inspection.inspectionStatusId === 4}
                            onPress={(e) => {
                                e.stopPropagation();

                                const nextStatus = getNextInspectionStatus(inspection);

                                if (nextStatus === null) {
                                    Alert.alert(
                                        'Nicht erlaubt',
                                        'Dieser Inspektionstyp kann nicht gesperrt werden.',
                                    );
                                    return;
                                }

                                confirmStatusChange(inspection, nextStatus);
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
