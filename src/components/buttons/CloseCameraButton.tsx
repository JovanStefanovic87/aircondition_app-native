import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CloseCameraButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.closeButton} onPress={onPress}>
      <Icon name="times" size={30} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'white',
    opacity: 0.5,
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CloseCameraButton;
