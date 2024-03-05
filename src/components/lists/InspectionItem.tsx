import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';
import { customColors } from '../../assets/styles/customStyles';
import { InspectionUpdate } from '../../../database/types';
import TextMain from '../text/TextMain';

interface Props {
    inspection: InspectionUpdate;
    onPress?: (id: string) => void;
}

const InspectionItem: React.FC<Props> = ({ inspection, onPress }) => {
    return (
        <TouchableOpacity style={styles.inspectionItem} onPress={() => onPress(inspection.id)}>
            <View style={styles.itemHeader}>
                <TextMain text={inspection.contractNumber} />
                {inspection.inspectionStatusId ? <CheckedIcon /> : <DangerIcon />}
            </View>
            <TextMain text={inspection.location} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
});

export default InspectionItem;
