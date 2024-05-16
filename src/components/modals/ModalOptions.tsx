import React from 'react';
import { Modal, Pressable, View, StyleSheet } from 'react-native';
import TextTitle from '../text/TextTitle';

interface Option {
    value: string;
}

interface Props {
    modalVisible: boolean;
    hideModal: () => void;
    options: Option[];
    handleOptionSelect: (option: Option) => void;
}

const ModalOptions: React.FC<Props> = ({
    modalVisible,
    hideModal,
    options,
    handleOptionSelect,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={hideModal}
        >
            <Pressable style={styles.modalContainer} onPress={hideModal}>
                <View style={styles.modalContent}>
                    {options.map((option, index) => (
                        <Pressable
                            key={index}
                            onPress={() => handleOptionSelect(option)}
                            style={[styles.option, index === 0 && styles.firstOptionSeparator]}
                        >
                            <TextTitle text={option.value} />
                        </Pressable>
                    ))}
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
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        alignItems: 'center',
    },
    firstOptionSeparator: {
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
});

export default ModalOptions;
