import React from 'react';
import { Text } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

const TextWhite = ({ text = '' }) => <Text style={styles.text}>{text}</Text>;

const styles = {
    text: {
        color: customColors.white,
        fontSize: 20,
        textAlign: 'center' as 'center',
    },
};

export default TextWhite;
