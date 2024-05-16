import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

interface Props {
    onPress: () => void;
}

const windowWidth = Dimensions.get('window').width;

const CancelButton: React.FC<Props> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Nein</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cancelButton: {
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowWidth * 0.025,
        backgroundColor: 'red',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: windowWidth * 0.05,
    },
});

export default CancelButton;
