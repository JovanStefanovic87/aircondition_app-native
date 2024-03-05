import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    value: number | null;
    placeholder: string;
    setValue: (value: number | null) => void;
}

const InputNumber: React.FC<Props> = ({ value, placeholder, setValue }) => {
    const handleChangeText = (text: string) => {
        const numericValue = text.replace(/[^0-9,.]/g, '');
        const normalizedValue = numericValue.replace(',', '.');
        const parsedValue = normalizedValue ? parseFloat(normalizedValue) : null;
        setValue(parsedValue);
    };

    return (
        <TextInput
            value={value !== null ? value.toString() : ''}
            placeholder={placeholder}
            style={styles.input}
            onChangeText={handleChangeText}
            keyboardType="numeric"
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: customColors.blueLight,
        borderWidth: 2,
        color: customColors.black,
    },
});

export default InputNumber;
