import React from 'react';
import { customColors } from '../../assets/styles/customStyles';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface YellowSmileyProps {
    isVisible?: boolean;
    isActive?: boolean;
    onClick: () => void;
}

const YellowSmiley: React.FC<YellowSmileyProps> = ({
    isVisible = false,
    isActive = true,
    onClick,
}) => {
    const containerStyles: StyleProp<ViewStyle> = {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: customColors.greenLight,
        backgroundColor: isActive ? customColors.greenLight : 'white',
        borderRadius: 50,
        width: 70,
        height: 70,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
    };

    const handlePress = () => {
        if (isVisible) {
            onClick();
        }
    };

    return (
        <TouchableOpacity style={containerStyles} onPress={handlePress}>
            <Icon name="smile-o" size={50} color={isActive ? 'white' : '#d0d0d0'} />
        </TouchableOpacity>
    );
};

export default YellowSmiley;
