import React, { FC } from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    selectedValue: number;
    setSelectedValue: (value: number) => void;
    items: { value: string | number; label: string }[];
    isValid?: boolean;
    maxWidth?: DimensionValue;
}

const DropdownElements: FC<Props> = ({
    selectedValue,
    setSelectedValue,
    items,
    isValid = true,
    maxWidth = 400,
}) => {
    const borderColor = isValid ? customColors.blueLight : 'red';

    const styles = StyleSheet.create({
        dropdownContainer: {
            width: '95%',
            maxWidth: maxWidth,
            borderColor: customColors.blueLight,
            borderWidth: 2,
            borderRadius: 5,
            justifyContent: 'center',
        },
    });

    return (
        <View style={[styles.dropdownContainer, { borderColor }]}>
            <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)}
                items={items}
                value={selectedValue}
                useNativeAndroidPickerStyle={true}
                placeholder={{ label: 'Select an option', value: items[0]?.value }}
                style={{
                    inputAndroid: {
                        color: customColors.blueLight,
                        backgroundColor: 'white',
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
                }}
            />
        </View>
    );
};

export default DropdownElements;
