//src\components\modals\SuccessModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    visible: boolean;
    message: string | null;
    onClose: () => void;
}

const SuccessModal = ({ visible, message, onClose }: Props) => {
    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Uspeh</Text>
                    <Text style={styles.message}>{message}</Text>

                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Text style={styles.buttonText}>U redu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#28a745',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#28a745',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SuccessModal;
