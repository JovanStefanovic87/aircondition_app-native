import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type EmojisColumnBodyProps = {
  children: ReactNode;
};

const EmojisColumnBody: React.FC<EmojisColumnBodyProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 4,
  },
});

export default EmojisColumnBody;
