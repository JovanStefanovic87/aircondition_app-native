import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ZoneButtonProps {
  value?: string;
}

const ZoneButton: React.FC<ZoneButtonProps> = ({
  value = 'Nächster Schritt',
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 1,
        backgroundColor: customColors.blueLight,
        borderRadius: 6,
        height: 48,
        gap: 8,
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          width: 24,
          height: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="plus" size={16} color={customColors.blueLight} />
      </View>
      <Text style={{ color: 'white' }}>{value}</Text>
    </TouchableOpacity>
  );
};

export default ZoneButton;
