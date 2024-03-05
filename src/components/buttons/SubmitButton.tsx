import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';
import TextWhite from '../text/TextWhite';

interface Props {
    value: string;
    isDisabled: boolean;
}

const SubmitButton: React.FC<Props> = ({ value, isDisabled }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                isDisabled
                    ? { backgroundColor: customColors.blueLight, opacity: 0.5 }
                    : { backgroundColor: customColors.blueLight },
            ]}
            disabled={isDisabled}
        >
            <TextWhite text={value} />
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

export default SubmitButton;
