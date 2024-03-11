import React, { FC } from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    selectedValue: number;
    setSelectedValue: (value: number) => void;
    pickerPlaceholder?: string | number;
    items: { value: string | number; label: string }[];
    isValid?: boolean;
    maxWidth?: DimensionValue;
}

const Dropdown: FC<Props> = ({
    selectedValue,
    setSelectedValue,
    items,
    pickerPlaceholder,
    isValid = true,
    maxWidth = 400,
}) => {
    const borderColor = isValid ? customColors.blueLight : 'red';
    const placeholder = pickerPlaceholder ? { label: pickerPlaceholder, value: null } : {};

    const styles = StyleSheet.create({
        dropdownContainer: {
            flex: 1,
            width: '100%',
            maxWidth: maxWidth,
            borderColor: customColors.blueLight,
            borderWidth: 2,
            borderRadius: 5,
        },
    });

    return (
        <View style={[styles.dropdownContainer, { borderColor }]}>
            <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)}
                items={items}
                value={selectedValue}
                placeholder={placeholder}
                useNativeAndroidPickerStyle={true}
                style={{
                    inputAndroid: {
                        color: customColors.blueLight,
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                    placeholder: {
                        color: customColors.placeholder,
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                    iconContainer: {
                        top: 10,
                        right: 12,
                    },
                }}
            />
        </View>
    );
};

export default Dropdown;
