import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    onPress: () => void;
}

const DeleteButton: React.FC<Props> = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="delete" size={32} color="#fff" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'darkred',
        padding: 8,
        borderRadius: 8,
        marginLeft: 12,
    },
});

export default DeleteButton;
