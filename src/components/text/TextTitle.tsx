import React from 'react';
import { Text } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';

const TextTitle = ({ text = '', isTablet = true }) => (
    <Text style={{ color: customColors.black, fontSize: isTablet ? 24 : 16 }}>{text}</Text>
);

export default TextTitle;
