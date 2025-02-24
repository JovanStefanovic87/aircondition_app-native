import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    icon: string;
    onPress: () => void;
    style?: ViewStyle;
}

const IconOverImageButton: React.FC<Props> = ({ icon, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Icon name={icon} size={30} color="white" />
        </TouchableOpacity>
    );
};

export default IconOverImageButton;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: customColors.orangeLight,
        borderRadius: 5,
        alignItems: 'center',
    },
});
