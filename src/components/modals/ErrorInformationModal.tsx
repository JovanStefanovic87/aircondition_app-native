//src\components\modals\ErrorInformationModal.tsx
import React from 'react';
import { Modal, Pressable, View, Text, StyleSheet, Dimensions } from 'react-native';
import WarningButton from '../buttons/WarningButton';

const windowWidth = Dimensions.get('window').width;

interface Props {
    visible: boolean;
    message: string | null;
    onClose: () => void;
}

const ErrorInformationModal: React.FC<Props> = ({ visible, message, onClose }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <Pressable style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{message}</Text>
                    <WarningButton onPress={onClose} text="Ok" />
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: windowWidth * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderWidth: 4,
        borderColor: 'red',
    },
    modalTitle: {
        color: 'black',
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default ErrorInformationModal;
