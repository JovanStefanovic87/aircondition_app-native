import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateMinColumnWidth } from '../../helpers/universalFunctions';
import InputText from '../input/InputText';
import { Inspection } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';
import AutoFitTableContainer from '../containers/AutoFitTableContainer';
import RowContainerFlex from '../containers/RowContainerFlex';
import IconButton from '../buttons/IconButton';
import InputNumberNullToString from '../input/InputNumberNullToString';

interface Props {
    inspection: Inspection;
    setInspection: (inspection: Inspection) => void;
    saveInspection: (inspectionUpdate: Inspection) => void;
    onPressCamera: () => void;
    onPressGallery: () => void;
    onPressUpload: () => void;
}

const DeviceParameters: React.FC<Props> = ({
    inspection,
    saveInspection,
    setInspection,
    onPressCamera,
    onPressGallery,
    onPressUpload,
}) => {
    const { constructionYear, lastMaintenance, airVolume, note } = inspection;
    const pendingSaveRef = useRef(false);

    // Čuva se samo kada je pendingSaveRef postavljeno na true (tj. na blur)
    useEffect(() => {
        if (pendingSaveRef.current) {
            saveInspection(inspection);
            pendingSaveRef.current = false;
        }
    }, [inspection]);

    const triggerSave = () => {
        pendingSaveRef.current = true;
    };

    const minColWidth = calculateMinColumnWidth(29);

    return (
        <View style={styles.container}>
            <RowContainerFlex>
                <AutoFitTableContainer minColumnWidth={minColWidth}>
                    <Text style={styles.title}>{'Baujahr'}</Text>
                    <InputNumberNullToString
                        value={constructionYear}
                        setValue={(value) =>
                            setInspection({ ...inspection, constructionYear: value })
                        }
                        onBlur={triggerSave}
                    />
                </AutoFitTableContainer>
                <AutoFitTableContainer minColumnWidth={minColWidth}>
                    <Text style={styles.title}>{'Letzte Wartung'}</Text>
                    <InputText
                        value={lastMaintenance}
                        setValue={(value) =>
                            setInspection({ ...inspection, lastMaintenance: value.toString() })
                        }
                        onBlur={triggerSave}
                        placeholder="k.A."
                    />
                </AutoFitTableContainer>
                <AutoFitTableContainer minColumnWidth={minColWidth}>
                    <Text style={styles.title}>{'Volumentstrom (m3/h)'}</Text>
                    <InputNumberNullToString
                        value={airVolume}
                        setValue={(value) => setInspection({ ...inspection, airVolume: value })}
                        onBlur={triggerSave}
                    />
                </AutoFitTableContainer>
            </RowContainerFlex>
            <View style={styles.cameraIconsContainer}>
                <IconButton icon="camera" onPress={onPressCamera} />
                <IconButton icon="image" onPress={onPressGallery} />
                <IconButton icon="upload" onPress={onPressUpload} />
                <InputText
                    value={note}
                    setValue={(value) => setInspection({ ...inspection, note: value })}
                    onBlur={triggerSave}
                    placeholder="Notiz"
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
    },
});

export default DeviceParameters;
