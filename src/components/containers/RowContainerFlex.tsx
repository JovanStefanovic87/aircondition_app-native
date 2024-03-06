import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    children: React.ReactNode;
};

const RowContainerFlex: React.FC<Props> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
});

export default RowContainerFlex;
