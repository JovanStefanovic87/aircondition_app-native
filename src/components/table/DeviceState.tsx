import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GreenSmiley from '../icons/GreenSmiley';
import OrangeSmiley from '../icons/OrangeSmiley';
import RedSmiley from '../icons/RedSmiley';
import YellowSmiley from '../icons/YellowSmiley';
import InputText from '../input/InputText';
import IconButton from '../buttons/IconButton';
import { DeviceStateComponent, InspectionDeviceStateUpdate } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    deviceState: DeviceStateComponent;
    groupTypeName: string;
    saveInspectionDeviceState: (deviceState: InspectionDeviceStateUpdate) => void;
    onOpenScanner: (deviceStateId: string) => void;
}

const DeviceState: React.FC<Props> = ({
    deviceState,
    groupTypeName,
    saveInspectionDeviceState,
    onOpenScanner,
}) => {
    const { inspectionDeviceStateId, isUsingNote, value, note, deviceStateValues, name } =
        deviceState;

    const [activeColor, setActiveColor] = useState<number | null>(value);
    const [noteValue, setNoteValue] = useState<string | null>(note);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (mounted) {
            saveInspectionDeviceState({
                id: inspectionDeviceStateId,
                value: activeColor,
                note: noteValue,
            });
        } else {
            setMounted(true);
        }
    }, [activeColor]);

    const handleColorClick = (color: number) => {
        setActiveColor((prev) => (prev === color ? null : color));
    };

    const hasColor = (color: number) => deviceStateValues.some((s) => s.stateValueId === color);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>

            <View style={styles.row}>
                {hasColor(1) && (
                    <GreenSmiley
                        isActive={activeColor === 1}
                        isVisible
                        onClick={() => handleColorClick(1)}
                    />
                )}
                {hasColor(2) && (
                    <YellowSmiley
                        isActive={activeColor === 2}
                        isVisible
                        onClick={() => handleColorClick(2)}
                    />
                )}
                {hasColor(3) && (
                    <OrangeSmiley
                        isActive={activeColor === 3}
                        isVisible
                        onClick={() => handleColorClick(3)}
                    />
                )}
                {hasColor(4) && (
                    <RedSmiley
                        isActive={activeColor === 4}
                        isVisible
                        onClick={() => handleColorClick(4)}
                    />
                )}
            </View>

            {groupTypeName === 'MIKROBIOLOGISCH' && (
                <IconButton icon="barcode" onPress={() => onOpenScanner(inspectionDeviceStateId)} />
            )}

            <InputText
                value={noteValue}
                setValue={setNoteValue}
                isVisible={isUsingNote}
                onBlur={() =>
                    saveInspectionDeviceState({
                        id: inspectionDeviceStateId,
                        value: activeColor,
                        note: noteValue,
                    })
                }
            />
        </View>
    );
};

export default DeviceState;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: customColors.black,
        marginBottom: 8,
    },
});
