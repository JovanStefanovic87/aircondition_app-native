import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface SubmitButtonProps {
  value: string;
  isDisabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ value, isDisabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled
          ? { backgroundColor: customColors.blueLight, opacity: 0.5 }
          : { backgroundColor: customColors.blueLight },
      ]}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    maxWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default SubmitButton;
