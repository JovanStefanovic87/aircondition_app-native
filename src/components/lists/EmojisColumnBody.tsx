import React, { ReactNode, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type EmojisColumnBodyProps = {
  isOpen?: boolean;
  children: ReactNode;
};

const EmojisColumnBody: React.FC<EmojisColumnBodyProps> = ({ isOpen = true, children }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: isOpen ? '100%' : 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default EmojisColumnBody;
