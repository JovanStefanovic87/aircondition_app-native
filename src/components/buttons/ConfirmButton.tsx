import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

interface Props {
    onPress: () => void;
}

const windowWidth = Dimensions.get('window').width;

const ConfirmButton: React.FC<Props> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    confirmButton: {
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowWidth * 0.025,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
    },
});

export default ConfirmButton;
