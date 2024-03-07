import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateMinColumnWidth } from '../../helpers/universalFunctions';
import InputText from '../input/InputText';
import { Inspection } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';
import InputNumber from '../input/InputNumeric';
import AutoFitTableContainer from '../containers/AutoFitTableContainer';
import RowContainerFlex from '../containers/RowContainerFlex';

interface Props {
    inspection: Inspection;
    setInspection: (inspection: Inspection) => void;
    saveInspection: (inspectionUpdate: Inspection) => void;
}

const DeviceParameters: React.FC<Props> = ({ inspection, saveInspection, setInspection }) => {
    const { constructionYear, lastMaintenance, airVolume } = inspection;

    const handleSaveInspection = () => {
        saveInspection(inspection);
    };

    const minColWidth = calculateMinColumnWidth(29);

    return (
        <View style={styles.container}>
            <RowContainerFlex>
                <AutoFitTableContainer minColumnWidth={minColWidth}>
                    <Text style={styles.title}>{'Buajahr'}</Text>
                    <InputNumber
                        value={constructionYear}
                        setValue={(value) =>
                            setInspection({ ...inspection, constructionYear: value })
                        }
                        onBlur={handleSaveInspection}
                    />
                </AutoFitTableContainer>
                <AutoFitTableContainer minColumnWidth={minColWidth}>
                    <Text style={styles.title}>{'Letzte Wartung'}</Text>
                    <InputText
                        value={lastMaintenance}
                        setValue={(value) =>
                            setInspection({ ...inspection, lastMaintenance: value })
                        }
                        onBlur={handleSaveInspection}
                    />
                </AutoFitTableContainer>
                <AutoFitTableContainer minColumnWidth={minColWidth}>
                    <Text style={styles.title}>{'Volumentstrom (m3/h)'}</Text>
                    <InputNumber
                        value={airVolume}
                        setValue={(value) => setInspection({ ...inspection, airVolume: value })}
                        onBlur={handleSaveInspection}
                    />
                </AutoFitTableContainer>
            </RowContainerFlex>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: customColors.black,
        width: '100%',
    },
});

export default DeviceParameters;
