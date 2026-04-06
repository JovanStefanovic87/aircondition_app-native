import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, DimensionValue, Dimensions } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

interface Props {
    value: number | null | string;
    placeholder?: string;
    setValue: (value: string | null) => void;
    onBlur?: () => void;
    width?: DimensionValue;
    minWidth?: DimensionValue;
    isValid?: boolean;
    isVisible?: boolean;
}

const InputNumberNullToString: React.FC<Props> = ({
    value,
    placeholder = 'k.A.',
    setValue,
    onBlur,
    width = '100%',
    minWidth = 'auto',
    isValid = true,
    isVisible = true,
}) => {
    const [isTablet, setIsTablet] = useState(false);
    const [inputText, setInputText] = useState<string>('');
    const FONT_SIZE = isTablet ? 22 : 16;
    const INPUT_HEIGHT = isTablet ? 'auto' : 40;

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);
    }, []);

    useEffect(() => {
        if (value === null || value === undefined) {
            setInputText('');
        } else {
            setInputText(String(value));
        }
    }, [value]);

    const handleChange = (text: string) => {
        setInputText(text);
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

    const handleBlurInternal = () => {
        if (inputText === '') {
            setValue(null);
        } else {
            setValue(inputText);
        }

        onBlur?.();
    };

    return isVisible ? (
        <TextInput
            value={inputText}
            placeholder={placeholder}
            style={inputStyles}
            onChangeText={handleChange}
            onBlur={handleBlurInternal}
            placeholderTextColor={customColors.placeholder}
            keyboardType={'default'}
        />
    ) : null;
};

export default InputNumberNullToString;
