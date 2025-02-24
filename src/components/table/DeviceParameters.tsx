import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateMinColumnWidth } from '../../helpers/universalFunctions';
import InputText from '../input/InputText';
import { Inspection } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';
import InputNumber from '../input/InputNumeric';
import AutoFitTableContainer from '../containers/AutoFitTableContainer';
import RowContainerFlex from '../containers/RowContainerFlex';
import IconButton from '../buttons/IconButton';
import { deleteInspectionImage } from '../../../database/dataAccess/Command/sqlCommands';

interface Props {
    inspection: Inspection;
    setInspection: (inspection: Inspection) => void;
    saveInspection: (inspectionUpdate: Inspection) => void;
    onPressCamera: () => void;
    onPressGallery: () => void;
}

const DeviceParameters: React.FC<Props> = ({
    inspection,
    saveInspection,
    setInspection,
    onPressCamera,
    onPressGallery,
}) => {
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
            <View style={styles.cameraIconsContainer}>
                <IconButton icon="camera" onPress={onPressCamera} />
                <IconButton icon="image" onPress={onPressGallery} />
                <IconButton
                    icon="trash"
                    onPress={() =>
                        deleteInspectionImage(inspection.id, '15ab0771-2c19-4d5c-8ff2-34e2afabd334')
                    }
                />
            </View>
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
    cameraIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        maxWidth: '40%',
    },
});

export default DeviceParameters;
