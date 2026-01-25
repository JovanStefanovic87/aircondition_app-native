// src/components/text/TextWhite.tsx

import React from 'react';
import { Text, TextProps } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface Props extends TextProps {
    text?: string;
}

const TextWhite: React.FC<Props> = ({ text = '', style, ...rest }) => (
    <Text
        {...rest}
        style={[styles.text, style]}
        numberOfLines={1}
        ellipsizeMode="clip"
        allowFontScaling={false}
    >
        {text}
    </Text>
);

const styles = {
    text: {
        color: customColors.white,
        fontSize: 20,
        textAlign: 'center' as const,
    },
};

export default TextWhite;
