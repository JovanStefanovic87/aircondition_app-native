import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GreenSmiley from '../icons/GreenSmiley';
import OrangeSmiley from '../icons/OrangeSmiley';
import RedSmiley from '../icons/RedSmiley';
import YellowSmiley from '../icons/YellowSmiley';

interface SmileyColor {
  color: string;
  SmileyComponent: React.FC<{
    isActive: boolean;
    isVisible: boolean;
    onClick: () => void;
  }>;
  isVisible: boolean;
}

interface EmojisContainerProps {
  description?: string;
  green?: boolean;
  yellow?: boolean;
  orange?: boolean;
  red?: boolean;
}

const EmojisContainer: React.FC<EmojisContainerProps> = ({
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

  const smileyColors: SmileyColor[] = [
    { color: 'green', SmileyComponent: GreenSmiley, isVisible: green },
    { color: 'yellow', SmileyComponent: YellowSmiley, isVisible: yellow },
    { color: 'orange', SmileyComponent: OrangeSmiley, isVisible: orange },
    { color: 'red', SmileyComponent: RedSmiley, isVisible: red },
  ];

  const areAllGreenSmileysActive = smileyColors
    .filter((smiley) => smiley.color === 'green')
    .every((smiley) => activeColor === 'green');

  return (
    <View style={styles.container}>
      <Text>{description}</Text>
      <View style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    width: '100%',
  },
});

export default EmojisContainer;
