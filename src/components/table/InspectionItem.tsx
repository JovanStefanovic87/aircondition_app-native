import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';
import { customColors } from '../../assets/styles/customStyles';
import { InspectionUpdate } from '../../../database/types';
import TextMain from '../text/TextMain';
import PdfButton from '../buttons/PdfButton';
import DuplicateButton from '../buttons/DuplicateButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type NavScreenNavigationProp = NavigationProp<any, any>;

interface Props {
    inspection: InspectionUpdate;
    onPress?: (id: string) => void;
}

const InspectionItem: React.FC<Props> = ({ inspection, onPress }) => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    return (
        <TouchableOpacity style={styles.inspectionItem} onPress={() => onPress(inspection.id)}>
            <View style={styles.container}>
                <View style={styles.actionsContainer}>
                    <View style={styles.actionRow}>
                        <PdfButton
                            onPress={() =>
                                navigation.navigate('PdfViewerScreen', {
                                    inspectionId: inspection.id,
                                })
                            }
                        />
                        <DuplicateButton
                            onPress={() => console.log('Duplicate inspection', inspection.id)}
                        />
                    </View>
                    <View style={styles.flexEnd}>
                        {inspection.inspectionStatusId ? <CheckedIcon /> : <DangerIcon />}
                    </View>
                </View>

                <View style={styles.flexContainer}>
                    <TextMain text="Name der Anlage: " isBold={true} />
                    <TextMain text={inspection.facilityName} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Ausftellungsort: " isBold={true} />
                    <TextMain text={inspection.location} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Anlage-Id: " isBold={true} />
                    <TextMain text={inspection.barcode} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Nummer der Leistungsnachweis : " isBold={true} />
                    <TextMain text={inspection.contractNumber} />
                </View>
            </View>
        </TouchableOpacity>
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
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    itemSubTitle: {
        fontSize: 16,
        color: customColors.text,
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
});

export default InspectionItem;
