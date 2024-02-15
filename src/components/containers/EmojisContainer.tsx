import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GreenSmiley from '../icons/GreenSmiley';
import OrangeSmiley from '../icons/OrangeSmiley';
import RedSmiley from '../icons/RedSmiley';
import YellowSmiley from '../icons/YellowSmiley';
import InputText from '../input/InputText';

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
  title?: string;
  green?: boolean;
  yellow?: boolean;
  orange?: boolean;
  red?: boolean;
  note?: string;
}

const EmojisContainer: React.FC<EmojisContainerProps> = ({
  title = 'N/A',
  green = false,
  yellow = false,
  orange = false,
  red = false,
}) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [note, setNote] = useState<string>('');

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {smileyColors.map(({ color, SmileyComponent, isVisible }) => (
          <TouchableOpacity key={color} style={{ marginRight: 8 }}>
            <SmileyComponent
              isActive={activeColor === color}
              isVisible={isVisible}
              onClick={() => handleColorClick(color)}
            />
          </TouchableOpacity>
        ))}
      </View>
      <InputText value={note} setValue={setNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginVertical: 8,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    width: '100%',
  },
});

export default EmojisContainer;
