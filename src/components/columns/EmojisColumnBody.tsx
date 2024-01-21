import React, { ReactNode, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type EmojisColumnBodyProps = {
  isOpen?: boolean;
  children: ReactNode;
};

const EmojisColumnBody: React.FC<EmojisColumnBodyProps> = ({
  isOpen = true,
  children,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingVertical: isOpen ? 4 : 0,
    },
  });

  return (
    <View style={styles.container}>
      {isOpen && <View style={{ height: '100%' }}>{children}</View>}
    </View>
  );
};

export default EmojisColumnBody;
