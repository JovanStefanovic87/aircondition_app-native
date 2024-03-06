import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ColContainerProps {
    children: React.ReactNode;
    gap?: number;
    marginBottom?: number;
}

const ColContainer: React.FC<ColContainerProps> = ({ children, gap = 10, marginBottom = 20 }) => (
    <View style={[styles.container, { gap, marginBottom }]}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        width: '95%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 5,
    },
});

export default ColContainer;
