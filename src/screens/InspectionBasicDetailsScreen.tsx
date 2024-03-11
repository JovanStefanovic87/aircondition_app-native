import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { useInspectionStore } from '../store/store';
import moment from 'moment';
import { InspectionUpdate, Inspection } from '../../database/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import BarcodeScanner from '../components/camera/BarcodeScanner';
import InputText from '../components/input/InputText';
import IconButton from '../components/buttons/IconButton';
import Dropdown from '../components/input/Dropdown';
import PrimaryButton from '../components/buttons/PrimaryButton';
import {
    getDeviceTypes,
    getInspectionTypes,
    getInspectionById,
} from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables } from '../../database/dataAccess/helpers';
import { saveInspection } from '../../database/dataAccess/Query/sqlCommands';
import TextMain from '../components/text/TextMain';
import ErrorBoundary from '../components/errors/ErrorBoundary';
import TableContainer from '../components/containers/TableContainer';
import RowContainer from '../components/containers/RowContainer';

type NewInspectionScreenNavigationProp = NavigationProp<Record<string, object>, string>;
type DeviceType = {
    id: number;
    name: string;
};
type InspectionType = {
    id: number;
    name: string;
};

const InspectionBasicDetailsScreen = () => {
    const navigation = useNavigation<NewInspectionScreenNavigationProp>();
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [isScannerOpen, setScannerOpen] = useState(false);
    const [scanType, setScanType] = useState<string>('');
    const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
    const [inspectionTypes, setInspectionTypes] = useState<InspectionType[]>([]);
    const [form, setForm] = useState<InspectionUpdate>({
        barcode: '',
        deviceTypeId: null,
        inspectionTypeId: null,
        facilityName: '',
        location: '',
        contractNumber: '',
        createdAt: '',
        userId: 'c1480367-7de5-4275-aa33-dde1db51c45e',
        inspectionStatusId: 0,
    });
    const [validation, setValidation] = useState<Record<string, boolean>>({
        barcode: true,
        deviceTypeId: true,
        facilityName: true,
        location: true,
        inspectionTypeId: true,
        contractNumber: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedDeviceTypes = await getDeviceTypes();
            const fetchedInspectionTypes = await getInspectionTypes();
            setDeviceTypes(fetchedDeviceTypes);
            setInspectionTypes(fetchedInspectionTypes);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchInspectionData = async () => {
            if (inspectionId) {
                const inspectionData = await getInspectionById(inspectionId);
                if (inspectionData) {
                    setForm((prevForm) => ({
                        ...prevForm,
                        id: inspectionId ? inspectionId : null,
                        barcode: inspectionData.barcode,
                        deviceTypeId: inspectionData.deviceTypeId,
                        inspectionTypeId: inspectionData.inspectionTypeId,
                        facilityName: inspectionData.facilityName,
                        location: inspectionData.location,
                        contractNumber: inspectionData.contractNumber,
                        createdAt: inspectionData.createdAt,
                        inspectionStatusId: inspectionData.inspectionStatusId
                            ? inspectionData.inspectionStatusId
                            : 0,
                    }));
                }
            }
        };

        fetchInspectionData();
    }, [inspectionId]);

    const submit = async () => {
        // Revalidate all fields on every submit
        const errors: string[] = [];
        const newValidation: Record<string, boolean> = {
            barcode: true,
            deviceTypeId: true,
            facilityName: true,
            location: true,
            inspectionTypeId: true,
            contractNumber: true,
        };

        Object.entries(form).forEach(([key, value]) => {
            if (key !== 'createdAt' && key !== 'inspectionStatusId' && !value) {
                errors.push(key);
                newValidation[key] = false;
            }
        });

        if (form.barcode.length !== 13) {
            errors.push('barcode');
            newValidation.barcode = false;
        }

        // Update validation state
        setValidation(newValidation);

        if (errors.length > 0) {
            console.log(errors.map((error) => `${error} is required`));
            return;
        }

        // Proceed with submission if all validations pass
        const formattedCreatedAt = moment().format('YYYY-MM-DDTHH:mm:ss[Z]');
        setForm((prevForm) => ({
            ...prevForm,
            createdAt: formattedCreatedAt,
        }));

        const newId = await saveInspection(form);

        if (newId) {
            useInspectionStore.getState().setInspectionId(newId);
            navigation.navigate('InspectionDeviceStateScreen');
        }
        navigation.navigate('InspectionDeviceStateScreen');
    };

    const openScanner = (scanType: string) => {
        setScanType(scanType);
        setScannerOpen(true);
    };

    const renderDropdownItems = (items: DeviceType[]) => {
        return items.map((item) => ({
            key: item.id.toString(),
            value: item.id,
            label: item.name,
        }));
    };

    return (
        <ErrorBoundary>
            {isScannerOpen ? (
                <View style={styles.container}>
                    <BarcodeScanner
                        isScannerOpen={isScannerOpen}
                        setScannerOpen={setScannerOpen}
                        setScanResult={(result) => {
                            if (scanType === 'device') {
                                setForm((prevForm) => ({
                                    ...prevForm,
                                    barcode: result,
                                }));
                            } else if (scanType === 'contract') {
                                setForm((prevForm) => ({
                                    ...prevForm,
                                    contractNumber: result,
                                }));
                            }
                        }}
                    />
                </View>
            ) : (
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <GestureHandlerRootView style={styles.scrollContainer}>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.inputGroupContainer}>
                                <TextMain text="ANLAGE-ID:" />
                                <RowContainer>
                                    <InputText
                                        minWidth="78%"
                                        placeholder="Barcode"
                                        value={form.barcode}
                                        setValue={(value) => setForm({ ...form, barcode: value })}
                                        isValid={validation.barcode}
                                    />
                                    <IconButton
                                        icon="camera"
                                        onPress={() => openScanner('device')}
                                    />
                                    <TextInput />
                                </RowContainer>
                            </View>
                            <View style={styles.inputGroupContainer}>
                                <TextMain text="GERÄTEINFORMATION:" />
                                <TableContainer>
                                    <Dropdown
                                        selectedValue={form.deviceTypeId}
                                        setSelectedValue={(value) =>
                                            setForm({ ...form, deviceTypeId: value })
                                        }
                                        pickerPlaceholder="Lüftungssystem auswählen"
                                        items={renderDropdownItems(deviceTypes)}
                                        isValid={validation.deviceTypeId}
                                        maxWidth="100%"
                                    />
                                    <InputText
                                        placeholder="name der Anlage"
                                        value={form.facilityName}
                                        setValue={(value) =>
                                            setForm({ ...form, facilityName: value })
                                        }
                                        isValid={validation.facilityName}
                                    />
                                    <InputText
                                        placeholder="Aufstellungsort (wo?: z.B Keller, Dach, Technikzentral..."
                                        value={form.location}
                                        setValue={(value) => setForm({ ...form, location: value })}
                                        isValid={validation.location}
                                    />
                                    <Dropdown
                                        selectedValue={form.inspectionTypeId}
                                        setSelectedValue={(value) =>
                                            setForm({ ...form, inspectionTypeId: value })
                                        }
                                        pickerPlaceholder="Inspektionsart auswählen"
                                        items={renderDropdownItems(inspectionTypes)}
                                        isValid={validation.inspectionTypeId}
                                        maxWidth="100%"
                                    />
                                </TableContainer>
                            </View>
                            <View style={styles.inputGroupContainer}>
                                <TextMain text="NUMMER DER LEISTUNGSNACHWEIS:" />
                                <RowContainer>
                                    <InputText
                                        minWidth="78%"
                                        placeholder="Barcode"
                                        value={form.contractNumber}
                                        setValue={(value) =>
                                            setForm({ ...form, contractNumber: value })
                                        }
                                        isValid={validation.contractNumber}
                                    />
                                    <IconButton
                                        icon="camera"
                                        onPress={() => openScanner('contract')}
                                    />
                                    <TextInput />
                                </RowContainer>
                            </View>
                        </ScrollView>
                    </GestureHandlerRootView>
                    <View style={styles.rightAlign}>
                        <PrimaryButton title="Nächster Schritt" onPress={submit} />
                    </View>
                </KeyboardAvoidingView>
            )}
        </ErrorBoundary>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        maxHeight: '85%',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
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

export default InspectionBasicDetailsScreen;
