import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureResponderEvent } from 'react-native';

interface Props {
    onPress: (event: GestureResponderEvent) => void;
}

const EditButton: React.FC<Props> = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="pencil" size={32} color="#fff" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2563eb',
        padding: 8,
        borderRadius: 8,
        marginLeft: 12,
    },
});

export default EditButton;
