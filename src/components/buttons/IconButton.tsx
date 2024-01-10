import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
  icon: string;
  onPress: () => void;
}

const IconButton: React.FC<Props> = ({ icon, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon name={icon} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: customColors.orangeLight,
    borderRadius: 5,
    alignItems: 'center',
  },
});
