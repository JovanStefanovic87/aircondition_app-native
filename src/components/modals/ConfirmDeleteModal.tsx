import React from 'react';
import { Modal, Pressable, View, Text, StyleSheet, Dimensions } from 'react-native';
import ConfirmButton from '../buttons/ConfirmButton';
import CancelButton from '../buttons/CancelButton';
import ModalButtonsContainer from '../containers/ModalButtonsContainer';

const windowWidth = Dimensions.get('window').width;

interface Props {
    modalVisible: boolean;
    hideModal: () => void;
    handleConfirmDelete: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({ modalVisible, hideModal, handleConfirmDelete }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={hideModal}
        >
            <Pressable style={styles.modalContainer} onPress={hideModal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        Sind Sie sicher, dass Sie dieses Element löschen möchten?
                    </Text>
                    <ModalButtonsContainer>
                        <ConfirmButton onPress={handleConfirmDelete} />
                        <CancelButton onPress={hideModal} />
                    </ModalButtonsContainer>
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
    },
    modalTitle: {
        color: 'black',
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default ConfirmDeleteModal;
