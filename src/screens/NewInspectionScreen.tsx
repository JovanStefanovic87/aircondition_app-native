import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import BarcodeScanner from '../components/camera/BarcodeScanner';
import InputText from '../components/input/InputText';
import IconButton from '../components/buttons/IconButton';
import Dropdown from '../components/input/Dropdown';
import PrimaryButton from '../components/buttons/PrimaryButton';

type NewInspectionScreenNavigationProp = NavigationProp<any, any>;

const NewInspectionScreen = () => {
  const navigation = useNavigation<NewInspectionScreenNavigationProp>();
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [scanType, setScanType] = useState<string>('');
  const [deviceBarcode, setDeviceBarcode] = useState<string>('');
  const [contractBarcode, setContractBarcode] = useState<string>('');

  const handleOngoingInspectionPress = () => {
    navigation.navigate('OngoingInspectionScreen');
  };

  const openScanner = (scanType: string) => {
    setScanType(scanType);
    setScannerOpen(true);
  };

  const VentilationSystemsOptions = [
    { label: 'RLT-Anlage', value: 'RLT-Anlage' },
    { label: 'Kühlturm', value: 'Kühlturm' },
    { label: 'Gefahrstoffschrank', value: 'Gefahrstoffschrank' },
    { label: 'Laborabzung', value: 'Laborabzung' },
    { label: 'Nassabscheider', value: 'Nassabscheider' },
  ];

  const inspectionOptions = [
    {
      label: 'Gefährdungsbeurteilung VDI 6022',
      value: 'Gefährdungsbeurteilung VDI 6022',
    },
    {
      label: 'Hygieneerstinspektion VDI 6022',
      value: 'Hygieneerstinspektion VDI 6022',
    },
    { label: 'Hygieneinspektion VDI 6022', value: 'Gefahrstoffschrank' },
    {
      label: 'Routineprüfung nach DIN EN 14175 von Gefahrstoffschränken',
      value: 'Routineprüfung nach DIN EN 14175 von Gefahrstoffschränken',
    },
    {
      label: 'Routineprüfung nach DIN EN 14175 von Laborabzügen',
      value: 'Routineprüfung nach DIN EN 14175 von Laborabzügen',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isScannerOpen ? (
        <BarcodeScanner
          onClose={() => setScannerOpen(false)}
          setScanResult={
            scanType === 'device' ? setDeviceBarcode : setContractBarcode
          }
        />
      ) : (
        <GestureHandlerRootView style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.inputGroupContainer}>
              <Text>ANLAGE-ID:</Text>
              <View style={styles.rowContainer}>
                <InputText
                  placeholder="Basrcode"
                  value={deviceBarcode}
                  setValue={setDeviceBarcode}
                  width="84%"
                />
                <IconButton
                  icon="camera"
                  onPress={() => openScanner('device')}
                />
                <TextInput />
              </View>
            </View>
            <View style={styles.inputGroupContainer}>
              <Text>GERÄTEINFORMATION:</Text>
              <View style={styles.colContainer}>
                <Dropdown
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  pickerPlaceholder="Lüftungssystem auswählen"
                  items={VentilationSystemsOptions}
                />
                <InputText
                  placeholder="name der Anlage"
                  value={name}
                  setValue={setName}
                />
                <InputText
                  placeholder="Aufstellungsort (wo?: z.B Keller, Dach, Technikzentral..."
                  value={location}
                  setValue={setLocation}
                />
                <Dropdown
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  pickerPlaceholder="Inspektionsart auswählen"
                  items={inspectionOptions}
                />
              </View>
            </View>
            <View style={styles.inputGroupContainer}>
              <Text>NUMMER DER LEISTUNGSNACHWEIS:</Text>
              <View style={styles.rowContainer}>
                <InputText
                  placeholder="Basrcode"
                  value={contractBarcode}
                  setValue={setContractBarcode}
                  width="84%"
                />
                <IconButton
                  icon="camera"
                  onPress={() => openScanner('contract')}
                />
                <TextInput />
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      )}
      <View style={styles.rightAlign}>
        <PrimaryButton
          title="Nächster Schritt"
          onPress={handleOngoingInspectionPress}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    flex: 1,
    maxHeight: '85%',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  rowContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  colContainer: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
    paddingTop: 5,
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
  inputGroupContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightAlign: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default NewInspectionScreen;
