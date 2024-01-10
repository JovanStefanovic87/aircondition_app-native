import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const CheckedIcon = ({
  position = 'static' as 'absolute' | 'relative' | undefined,
}: {
  position?: 'absolute' | 'relative' | undefined;
}) => {
  return (
    <View style={[styles.container, position && { position }]}>
      <Text style={styles.text}>✓</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

export default CheckedIcon;
