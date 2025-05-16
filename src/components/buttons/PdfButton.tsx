import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    onPress: () => void;
}

const PdfButton: React.FC<Props> = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="file-pdf-box" size={32} color="#fff" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
    },
});

export default PdfButton;
