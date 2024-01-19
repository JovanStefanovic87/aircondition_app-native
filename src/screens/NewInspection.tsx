import { StyleSheet, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import BarcodeScanner from '../components/camera/BarcodeScanner';
import InputText from '../components/input/InputText';
import IconButton from '../components/buttons/IconButton';
import Dropdown from '../components/input/Dropdown';

const NewInspection = () => {
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('');

  const openScanner = () => {
    setScannerOpen(true);
  };

  const dropdownData = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <View style={styles.container}>
      {isScannerOpen ? (
        <BarcodeScanner
          onClose={() => setScannerOpen(false)}
          setScanResult={setScanResult}
        />
      ) : (
        <>
          <View style={styles.rowContainer}>
            <InputText
              placeholder="Barcode"
              value={scanResult}
              setValue={setBarcodeInput}
              width="84%"
            />
            <IconButton icon="camera" onPress={openScanner} />
            <TextInput />
          </View>
          <View style={styles.colContainer}>
            <Dropdown
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              pickerPlaceholder="Select Option"
              items={dropdownData}
            />
            <InputText
              placeholder="Barcode"
              value={barcodeInput}
              setValue={setBarcodeInput}
            />
            <InputText
              placeholder="Barcode"
              value={barcodeInput}
              setValue={setBarcodeInput}
            />
            <Dropdown
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              pickerPlaceholder="Select Option"
              items={dropdownData}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  colContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    paddingLeft: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default NewInspection;
