import React from 'react';
import { TextInput, StyleSheet, DimensionValue } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface TextInputProps {
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
  width?: DimensionValue;
  minWidth?: DimensionValue;
  isValid?: boolean;
}

const InputText: React.FC<TextInputProps> = ({
  value,
  placeholder,
  setValue,
  width = '100%',
  minWidth = 'auto',
  isValid = true,
}) => {
  const handleChange = (text: string) => {
    setValue(text);
  };

  const inputStyles = [styles.input, { width, minWidth }, !isValid && styles.inputInvalid];

  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      style={inputStyles}
      onChangeText={handleChange}
      placeholderTextColor={customColors.placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderColor: customColors.blueLight,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputInvalid: {
    borderColor: 'red',
  },
});

export default InputText;
