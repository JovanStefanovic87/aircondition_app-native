import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface PrimaryButtonProps {
  onPress: () => void;
  title?: string;
  isDisabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  title = 'Speichern',
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled
          ? { backgroundColor: customColors.blueLight, opacity: 0.5 }
          : { backgroundColor: customColors.blueLight },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
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

export default PrimaryButton;
