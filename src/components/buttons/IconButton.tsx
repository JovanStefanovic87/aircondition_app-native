// src/components/buttons/IconButton.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { customColors } from '../../assets/styles/customStyles';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';

interface Props {
    icon: string;
    onPress: () => void;
    isRequired?: boolean;
}

const IconButton: React.FC<Props> = ({ icon, onPress, isRequired }) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Icon name={icon} size={30} color="white" />
            </TouchableOpacity>

            {isRequired !== undefined && (
                <View style={styles.statusIcon}>
                    {isRequired ? (
                        <CheckedIcon position="relative" />
                    ) : (
                        <DangerIcon position="relative" />
                    )}
                </View>
            )}
        </View>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    button: {
        padding: 10,
        backgroundColor: customColors.orangeLight,
        borderRadius: 5,
        alignItems: 'center',
    },
    statusIcon: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
});
