import React from 'react';
import { TextInput, StyleSheet, View, DimensionValue } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface TextInputProps {
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
  width?: DimensionValue;
}

const InputText: React.FC<TextInputProps> = ({
  value,
  placeholder,
  setValue,
  width = 'auto',
}) => {
  const handleChange = (text: string) => {
    setValue(text);
  };

  const styles = StyleSheet.create({
    input: {
      flex: 1,
      minWidth: '100%',
      width: width,
      height: 40,
      borderColor: customColors.blueLight,
      borderWidth: 2,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
  });

  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      style={styles.input}
      onChangeText={handleChange}
      placeholderTextColor={customColors.placeholder}
    />
  );
};

export default InputText;
