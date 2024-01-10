import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DangerIcon = ({
  position = 'static',
}: {
  position?: 'absolute' | 'relative' | 'static';
}) => {
  return (
    <View style={[styles.container, position !== 'static' && { position }]}>
      <Text style={styles.text}>!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DangerIcon;
