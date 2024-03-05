import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GreenSmiley from '../icons/GreenSmiley';
import OrangeSmiley from '../icons/OrangeSmiley';
import RedSmiley from '../icons/RedSmiley';
import YellowSmiley from '../icons/YellowSmiley';
import InputText from '../input/InputText';
import { DeviceStateComponent, InspectionDeviceStateUpdate } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';

type SmileyColorProps = {
    color: number;
    SmileyComponent: React.FC<{ isActive: boolean; isVisible: boolean; onClick: () => void }>;
    isVisible: boolean;
};

interface Props {
    deviceState: DeviceStateComponent;
    saveInspectionDeviceState: (deviceState: InspectionDeviceStateUpdate) => void;
}

const DeviceStateContainer: React.FC<Props> = ({ deviceState, saveInspectionDeviceState }) => {
    const { inspectionDeviceStateId, isUsingNote, value, note, deviceStateValues, name } =
        deviceState;
    const [activeColor, setActiveColor] = useState<number>(value);
    const [noteValue, setNoteValue] = useState<string>(note);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const GREEN = 1;
    const YELLOW = 2;
    const ORANGE = 3;
    const RED = 4;

    useEffect(() => {
        if (isMounted) {
            saveInspectionDeviceState({
                id: inspectionDeviceStateId,
                value: activeColor,
                note: noteValue,
            });
        } else {
            setIsMounted(true);
        }
    }, [activeColor]);

    const handleColorClick = (color: number) => {
        setActiveColor((prevColor) => (prevColor === color ? null : color));
        saveInspectionDeviceState({
            id: inspectionDeviceStateId,
            value: activeColor,
            note: noteValue,
        });
    };

    const checkColor = (color: number) =>
        deviceStateValues.some((smiley) => smiley.stateValueId === color);

    const smileyColors: SmileyColorProps[] = [
        { color: GREEN, SmileyComponent: GreenSmiley, isVisible: checkColor(GREEN) },
        { color: YELLOW, SmileyComponent: YellowSmiley, isVisible: checkColor(YELLOW) },
        { color: ORANGE, SmileyComponent: OrangeSmiley, isVisible: checkColor(ORANGE) },
        { color: RED, SmileyComponent: RedSmiley, isVisible: checkColor(RED) },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.row}>
                {smileyColors.map(({ color, SmileyComponent, isVisible }) => (
                    <SmileyComponent
                        key={color}
                        isActive={activeColor === color}
                        isVisible={isVisible}
                        onClick={() => handleColorClick(color)}
                    />
                ))}
            </View>
            <InputText
                value={noteValue}
                setValue={setNoteValue}
                isVisible={isUsingNote}
                onBlur={() => {
                    saveInspectionDeviceState({
                        id: inspectionDeviceStateId,
                        value: activeColor,
                        note: noteValue,
                    });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
    },
});

export default DeviceStateContainer;
