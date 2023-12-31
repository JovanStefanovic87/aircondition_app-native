import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useStore } from '../store/store';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SubmitButton from '../components/buttons/SubmitButton';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Tab 1');

  const pickerPlaceholder = 'Select a tab...'; // Your custom placeholder text

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HomeScreen</Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Dugme" onPress={() => {}} />
        <SubmitButton isDisabled={false} value="Submit" />
      </View>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedTab(value)}
          items={[
            { label: 'Tab 1', value: 'Tab 1' },
            { label: 'Tab 2', value: 'Tab 2' },
            { label: 'Tab 3', value: 'Tab 3' },
          ]}
          value={selectedTab}
          placeholder={{ label: pickerPlaceholder, value: null }} // Set the custom placeholder
          useNativeAndroidPickerStyle={false} // This ensures the placeholder displays correctly on Android
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
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
  dropdownContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
  },
});

export default HomeScreen;
