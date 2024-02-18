import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome for icons

interface CameraButtonProps {
  onPress: () => void;
}

const CameraButton: React.FC<CameraButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name="camera" size={32} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -25 }],
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 15,
  },
});

export default CameraButton;
