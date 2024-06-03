import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, DimensionValue, Dimensions } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

interface Props {
    value: number | null;
    placeholder?: string;
    setValue: (value: number) => void;
    onBlur?: () => void;
    width?: DimensionValue;
    minWidth?: DimensionValue;
    isValid?: boolean;
    isVisible?: boolean;
}

const InputNumeric: React.FC<Props> = ({
    value,
    placeholder,
    setValue,
    onBlur,
    width = '100%',
    minWidth = 'auto',
    isValid = true,
    isVisible = true,
}) => {
    const [isTablet, setIsTablet] = useState(false);
    const [inputText, setInputText] = useState<string>(value !== null ? value.toString() : '');
    const FONT_SIZE = isTablet ? 22 : 16;
    const INPUT_HEIGHT = isTablet ? 'auto' : 40;

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);
    }, []);

    useEffect(() => {
        setInputText(value !== null ? value.toString() : null);
    }, [value]);

    const handleChange = (text: string) => {
        const formattedText = text.replace(/[^0-9.,]/g, '');
        setInputText(formattedText);
        setValue(Number(formattedText.replace(/,/g, '')));
    };

    const styles = StyleSheet.create({
        input: {
            flex: 1,
            height: INPUT_HEIGHT,
            borderColor: customColors.blueLight,
            borderWidth: 2,
            paddingHorizontal: 10,
            borderRadius: 5,
            color: customColors.black,
            fontSize: FONT_SIZE,
        },
        inputInvalid: {
            borderColor: 'red',
        },
    });

    const inputStyles = [styles.input, { width, minWidth }, !isValid && styles.inputInvalid];

    return isVisible ? (
        <TextInput
            value={inputText}
            placeholder={placeholder}
            style={inputStyles}
            onChangeText={handleChange}
            onBlur={onBlur}
            placeholderTextColor={customColors.placeholder}
            keyboardType={'numeric'}
        />
    ) : null;
};

export default InputNumeric;
