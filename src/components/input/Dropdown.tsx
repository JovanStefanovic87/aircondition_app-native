import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { customColors } from '../../assets/styles/customStyles';

interface DropdownProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  pickerPlaceholder: string;
  items: { label: string; value: string }[];
}

const Dropdown: FC<DropdownProps> = ({
  selectedTab,
  items,
  setSelectedTab,
  pickerPlaceholder,
}) => {
  return (
    <View style={styles.dropdownContainer}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedTab(value)}
        items={items}
        value={selectedTab}
        placeholder={{ label: pickerPlaceholder, value: null }}
        useNativeAndroidPickerStyle={true}
        style={{
          inputAndroid: {
            color: customColors.blueLight,
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          placeholder: {
            color: customColors.placeholder,
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    minWidth: '100%',
    borderColor: customColors.blueLight,
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Dropdown;
