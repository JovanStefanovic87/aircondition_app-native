import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SubmitButton from '../components/buttons/SubmitButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmojisContainer from '../components/containers/EmojisContainer';
import EmojisColumnContainer from '../components/containers/EmojisColumnContainer';
import InputText from '../components/input/InputText';
import InputNumber from '../components/input/InputNumber';
import AssemblyPartsSourceContainer from '../components/containers/AssemblyPartsSourceContainer';
import ZoneButton from '../components/buttons/ZoneButton';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Tab 1');
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputTextValue, setInputTextValue] = useState<string>('');
  const image1 = 'aussenluftkanal';
  const image2 = 'gefahrstoffschran';
  const image3 = 'schalldampfer';

  const pickerPlaceholder = 'Select a tab...';

  return (
    <GestureHandlerRootView style={styles.scrollContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <PrimaryButton title="Dugme" onPress={() => {}} />
            <SubmitButton isDisabled={false} value="Submit" />
          </View>
          <AssemblyPartsSourceContainer
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            pickerPlaceholder={pickerPlaceholder}
            images={[image1, image2, image3]}
          />
          <EmojisColumnContainer title="ANLAGE" isComplited={true}>
            <EmojisContainer description="Analge" green red yellow orange />
            <EmojisContainer description="Analge" green red yellow orange />
            <EmojisContainer description="Analge" green red yellow orange />
          </EmojisColumnContainer>
        </View>
        <InputText
          value={inputTextValue}
          placeholder="Input"
          setValue={setInputTextValue}
        />
        <InputNumber
          value={inputValue}
          placeholder="Number"
          setValue={setInputValue}
        />
        <ZoneButton />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  container: {
    gap: 7,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 5,
  },
});

export default HomeScreen;
