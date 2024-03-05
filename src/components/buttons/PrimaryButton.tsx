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
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        maxWidth: 200,
    },
});

export default PrimaryButton;
