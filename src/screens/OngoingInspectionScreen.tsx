import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmojisContainer from '../components/containers/EmojisContainer';
import EmojisColumnContainer from '../components/containers/EmojisColumnContainer';

const OngoingInspectionScreen = () => {
  return (
    <View>
      <GestureHandlerRootView style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <EmojisColumnContainer title="ANLAGE" isComplited={true}>
              <EmojisContainer description="Analge" green red yellow orange />
              <EmojisContainer description="Analge" green red yellow orange />
              <EmojisContainer description="Analge" green red yellow orange />
            </EmojisColumnContainer>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default OngoingInspectionScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
    maxHeight: '85%',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
});
