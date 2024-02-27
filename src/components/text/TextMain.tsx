import React from 'react';
import { Text } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

const TextMain = ({ text = '' }) => <Text style={styles.text}>{text}</Text>;

const styles = {
    text: {
        color: customColors.black,
    },
};

export default TextMain;
