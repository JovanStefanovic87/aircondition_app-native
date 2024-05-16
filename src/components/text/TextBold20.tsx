import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    text: string;
}

const TextBold20: React.FC<Props> = ({ text }) => {
    return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: customColors.black,
    },
});

export default TextBold20;
