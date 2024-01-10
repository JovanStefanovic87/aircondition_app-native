import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GreenSmiley from '../icons/GreenSmiley';
import OrangeSmiley from '../icons/OrangeSmiley';
import RedSmiley from '../icons/RedSmiley';
import YellowSmiley from '../icons/YellowSmiley';

const EmojisContainer = ({
  description = 'N/A',
  green = false,
  yellow = false,
  orange = false,
  red = false,
}) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const handleColorClick = (color: string) => {
    if (activeColor === color) {
      setActiveColor(null);
    } else {
      setActiveColor(color);
    }
  };

  const smileyColors = [
    { color: 'green', SmileyComponent: GreenSmiley, isVisible: green },
    { color: 'yellow', SmileyComponent: YellowSmiley, isVisible: yellow },
    { color: 'orange', SmileyComponent: OrangeSmiley, isVisible: orange },
    { color: 'red', SmileyComponent: RedSmiley, isVisible: red },
  ];

  // Check if every GreenSmiley is active
  const areAllGreenSmileysActive = smileyColors
    .filter((smiley) => smiley.color === 'green')
    .every((smiley) => activeColor === 'green');

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Text>{description}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 8,
        }}
      >
        {smileyColors.map(({ color, SmileyComponent, isVisible }) => (
          <TouchableOpacity
            key={color}
            onPress={() => handleColorClick(color)}
            style={{ marginRight: 8 }}
          >
            <SmileyComponent
              isActive={activeColor === color}
              isVisible={isVisible}
              onClick={() => {}}
            />
          </TouchableOpacity>
        ))}
      </View>
      {areAllGreenSmileysActive && <Text>All GreenSmileys are active!</Text>}
    </View>
  );
};

export default EmojisContainer;
