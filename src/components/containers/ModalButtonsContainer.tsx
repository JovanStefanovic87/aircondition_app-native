import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
    children: React.ReactNode;
}

const ModalButtonsContainer: React.FC<Props> = ({ children }) => {
    return <View style={styles.modalButtons}>{children}</View>;
};

const styles = StyleSheet.create({
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
    },
});

export default ModalButtonsContainer;
