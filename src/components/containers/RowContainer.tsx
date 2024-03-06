import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    children: React.ReactNode;
};

const RowContainer: React.FC<Props> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
});

export default RowContainer;
