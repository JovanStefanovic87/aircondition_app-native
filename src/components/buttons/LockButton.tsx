import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureResponderEvent } from 'react-native';

interface Props {
    onPress: (event: GestureResponderEvent) => void;
    locked: boolean;
}

const LockButton: React.FC<Props> = ({ onPress, locked }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons
            name={locked ? 'lock' : 'lock-open'}
            size={32}
            color={locked ? '#e01044' : '#ffffff'}
        />
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

export default LockButton;
