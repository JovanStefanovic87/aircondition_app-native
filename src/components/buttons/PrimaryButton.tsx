import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';
import TextWhite from '../text/TextWhite';

interface Props {
    onPress: () => void;
    title?: string;
    isDisabled?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ onPress, title = 'Speichern', isDisabled = false }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                isDisabled
                    ? { backgroundColor: customColors.blueLight, opacity: 0.5 }
                    : { backgroundColor: customColors.blueLight },
            ]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <TextWhite text={title} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
});

export default PrimaryButton;
