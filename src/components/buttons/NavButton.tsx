import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import Icon from 'react-native-vector-icons/FontAwesome';

interface NavButtonProps extends TouchableOpacityProps {
    iconName: string;
    iconColor: string;
    buttonText: string;
}

const NavButton: React.FC<NavButtonProps> = ({ iconName, iconColor, buttonText, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={iconName} size={vw(20)} color={iconColor} />
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '46%',
        aspectRatio: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#333',
        fontSize: vw(3.5),
        fontWeight: 'bold',
        marginTop: 20,
        width: '80%',
        textAlign: 'center',
    },
});

export default NavButton;
