import React from 'react';
import { TextInput, StyleSheet, DimensionValue } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    value: string;
    placeholder?: string;
    setValue: (value: string) => void;
    onBlur?: () => void;
    width?: DimensionValue;
    minWidth?: DimensionValue;
    isValid?: boolean;
    isVisible?: boolean;
}

const InputText: React.FC<Props> = ({
    value,
    placeholder,
    setValue,
    onBlur,
    width = '100%',
    minWidth = 'auto',
    isValid = true,
    isVisible = true,
}) => {
    const handleChange = (text: string) => {
        setValue(text);
    };

    const inputStyles = [styles.input, { width, minWidth }, !isValid && styles.inputInvalid];

    return isVisible ? (
        <TextInput
            value={value}
            placeholder={placeholder}
            style={inputStyles}
            onChangeText={handleChange}
            onBlur={onBlur}
            placeholderTextColor={customColors.placeholder}
        />
    ) : null;
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        borderColor: customColors.blueLight,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: customColors.black,
    },
    inputInvalid: {
        borderColor: 'red',
    },
});

export default InputText;
