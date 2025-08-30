import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    onPress: (event: GestureResponderEvent) => void;
}

const DuplicateButton: React.FC<Props> = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="content-copy" size={32} color="#fff" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#555',
        padding: 8,
        borderRadius: 8,
    },
});

export default DuplicateButton;
