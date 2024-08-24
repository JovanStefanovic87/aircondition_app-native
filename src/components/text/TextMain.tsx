import React from 'react';
import { Text, TextStyle } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

type TextMainProps = {
    text?: string;
    isBold?: boolean;
};

const TextMain: React.FC<TextMainProps> = ({ text = '', isBold = false }) => {
    const styles: TextStyle = {
        color: customColors.black,
        fontWeight: isBold ? 'bold' : ('normal' as TextStyle['fontWeight']),
        fontSize: 16,
    };

    return <Text style={styles}>{text}</Text>;
};

export default TextMain;
