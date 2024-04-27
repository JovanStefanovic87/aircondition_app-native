import React from 'react';
import { Text } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

const TextTitle = ({ text = '' }) => <Text style={styles.text}>{text}</Text>;

const styles = {
    text: {
        color: customColors.black,
        fontSize: 24,
    },
};

export default TextTitle;
