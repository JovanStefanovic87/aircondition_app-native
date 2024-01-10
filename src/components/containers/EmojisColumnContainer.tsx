import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmojisColumnHead from '../columns/EmojisColumnHead';
import { customColors } from '../../assets/styles/customStyles';
import EmojisColumnBody from '../columns/EmojisColumnBody';

interface EmojisColumnContainerProps {
  title: string;
  children: React.ReactNode;
  isComplited?: boolean;
}

const EmojisColumnContainer: React.FC<EmojisColumnContainerProps> = ({
  title,
  children,
  isComplited,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: customColors.blueLight,
      borderRadius: 8,
      paddingBottom: 4,
    },
  });

  return (
    <View style={styles.container}>
      <EmojisColumnHead title={title} isCompleted={isComplited} />
      <EmojisColumnBody>{children}</EmojisColumnBody>
    </View>
  );
};

export default EmojisColumnContainer;
