import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useState } from 'react';
// import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputText from '../components/input/InputText';
import IconButton from '../components/buttons/IconButton';
import Dropdown from '../components/input/Dropdown';

interface BarcodeData {
  data: string;
}

const NewInspection = () => {
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<BarcodeData | null>(null);
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('');

  const openScanner = () => {
    setScannerOpen(true);
  };

  const handleBarCodeScanned = (event: any) => {
    const barcodeData: BarcodeData = { data: event.data };
    setScanResult(barcodeData); // Store the scanned result
    setScannerOpen(false); // Close the scanner after a successful scan
    setBarcodeInput(event.data); // Set the scanned barcode to the input
  };

  const dropdownData = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <View style={styles.container}>
      {isScannerOpen ? (
        <></>
        // <RNCamera style={styles.camera} onBarCodeRead={handleBarCodeScanned} />
      ) : (
        <>
          <View style={styles.rowContainer}>
            <InputText
              placeholder="Barcode"
              value={barcodeInput}
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
