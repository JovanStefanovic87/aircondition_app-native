import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    text: string;
    isTablet?: boolean;
}

const TextBold20: React.FC<Props> = ({ text, isTablet = true }) => {
    const styles = StyleSheet.create({
        text: {
            fontSize: isTablet ? 20 : 12,
            fontWeight: 'bold',
            color: customColors.black,
        },
    });

    return <Text style={styles.text}>{text}</Text>;
};

export default TextBold20;
