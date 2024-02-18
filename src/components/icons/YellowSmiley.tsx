import React from 'react';
import { customColors } from '../../assets/styles/customStyles';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface OrangeSmileyProps {
  isVisible?: boolean;
  isActive?: boolean;
  onClick: () => void;
}

const OrangeSmiley: React.FC<OrangeSmileyProps> = ({
  isVisible = false,
  isActive = false,
  onClick,
}) => {
  const containerStyles: StyleProp<ViewStyle> = {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: customColors.yellowLight,
    backgroundColor: isActive ? customColors.yellowLight : 'white',
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
      <Icon name="meh-o" size={50} color={isActive ? 'white' : '#d0d0d0'} />
    </TouchableOpacity>
  );
};

export default OrangeSmiley;
