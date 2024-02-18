import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GreenSmiley from '../icons/GreenSmiley';
import OrangeSmiley from '../icons/OrangeSmiley';
import RedSmiley from '../icons/RedSmiley';
import YellowSmiley from '../icons/YellowSmiley';
import InputText from '../input/InputText';

type SmileyColor = {
  color: string;
  SmileyComponent: React.FC<{ isActive: boolean; isVisible: boolean; onClick: () => void }>;
  isVisible: boolean;
};

interface EmojisContainerProps {
  title?: string;
  smileys: { name: string }[];
}

const EmojisContainer: React.FC<EmojisContainerProps> = ({ title = 'N/A', smileys }) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [note, setNote] = useState<string>('');
  const GREEN = 'GREEN';
  const YELLOW = 'YELLOW';
  const ORANGE = 'ORANGE';
  const RED = 'RED';

  const handleColorClick = (color: string) => {
    setActiveColor((prevColor) => (prevColor === color ? null : color));
  };

  const checkColor = (color: string) => smileys.some((smiley) => smiley.name === color);

  const smileyColors: SmileyColor[] = [
    { color: GREEN, SmileyComponent: GreenSmiley, isVisible: checkColor(GREEN) },
    { color: YELLOW, SmileyComponent: YellowSmiley, isVisible: checkColor(YELLOW) },
    { color: ORANGE, SmileyComponent: OrangeSmiley, isVisible: checkColor(ORANGE) },
    { color: RED, SmileyComponent: RedSmiley, isVisible: checkColor(RED) },
  ];

  const areAllGreenSmileysActive = smileyColors
    .filter((smiley) => smiley.color === GREEN)
    .every((smiley) => activeColor === GREEN);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
      <InputText value={note} setValue={setNote} />
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default EmojisContainer;
