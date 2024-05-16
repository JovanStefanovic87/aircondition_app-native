import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    fileName: string;
    isTablet: boolean;
}

const DynamicFontSizeText: React.FC<Props> = ({ fileName, isTablet }) => {
    return (
        <Text style={[styles.name, { fontSize: isTablet ? 20 : 12 }]}>
            {fileName.split('.')[0]}
        </Text>
    );
};

const styles = StyleSheet.create({
    name: {
        color: customColors.black,
        paddingHorizontal: 2,
    },
});

export default DynamicFontSizeText;
