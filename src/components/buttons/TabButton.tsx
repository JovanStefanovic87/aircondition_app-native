import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface TabButtonProps {
  value: string;
  isActive?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({
  value = '',
  isActive = false,
}) => {
  const textColor = isActive ? 'black' : customColors.blueLight;
  const border = isActive ? 'white' : 'transparent';

  return (
    <TouchableOpacity style={[styles.button, { borderColor: border }]}>
      <Text style={[styles.text, { color: textColor }]}>
        {value.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 2,
    marginBottom: -0.5,
    zIndex: 3,
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
  },
});

export default TabButton;
