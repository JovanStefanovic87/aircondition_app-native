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
import { Inspection } from '../../database/types';
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
    const [form, setForm] = useState<Inspection>({
        barcode: '',
        deviceTypeId: null,
        inspectionTypeId: null,
        facilityName: '',
        location: '',
        contractNumber: '',
        createdAt: '',
        userId: 'c1480367-7de5-4275-aa33-dde1db51c45e',
    });
    const [validation, setValidation] = useState<Record<string, boolean>>({
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
                            : 1,
                    }));
                }
            }
        };

        fetchInspectionData();
    }, [inspectionId]);

    const submit = async () => {
        const errors: string[] = [];

        Object.entries(form).forEach(([key, value]) => {
            if (key !== 'createdAt' && !value) {
                errors.push(key);
                setValidation((prevValidation) => ({
                    ...prevValidation,
                    [key]: false,
                }));
            }
        });

        if (errors.length > 0) {
            console.log(errors.map((error) => `${error} is required`));
            return;
        }

        const formattedCreatedAt = moment().format('YYYY-MM-DDTHH:mm:ss[Z]');
        setForm((prevForm) => ({
            ...prevForm,
            createdAt: formattedCreatedAt,
        }));

        const newId = inspectionId ? inspectionId : await saveInspection(form);

        if (newId) {
            useInspectionStore.getState().setInspectionId(newId);
            navigation.navigate('InspectionDeviceStateScreen');
        }
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
                                <View style={styles.rowContainer}>
                                    <InputText
                                        minWidth="78%"
                                        placeholder="Barcode"
                                        value={form.barcode}
                                        setValue={(value) => setForm({ ...form, barcode: value })}
                                        isValid={validation.deviceTypeId}
                                    />
                                    <IconButton
                                        icon="camera"
                                        onPress={() => openScanner('device')}
                                    />
                                    <TextInput />
                                </View>
                            </View>
                            <View style={styles.inputGroupContainer}>
                                <TextMain text="GERÄTEINFORMATION:" />
                                <View style={styles.colContainer}>
                                    <Dropdown
                                        selectedTab={form.deviceTypeId}
                                        setSelectedTab={(value) =>
                                            setForm({ ...form, deviceTypeId: value })
                                        }
                                        pickerPlaceholder="Lüftungssystem auswählen"
                                        items={renderDropdownItems(deviceTypes)}
                                        isValid={validation.deviceTypeId}
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
                                        selectedTab={form.inspectionTypeId}
                                        setSelectedTab={(value) =>
                                            setForm({ ...form, inspectionTypeId: value })
                                        }
                                        pickerPlaceholder="Inspektionsart auswählen"
                                        items={renderDropdownItems(inspectionTypes)}
                                        isValid={validation.inspectionTypeId}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputGroupContainer}>
                                <TextMain text="NUMMER DER LEISTUNGSNACHWEIS:" />
                                <View style={styles.rowContainer}>
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
                                </View>
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
        width: '100%',
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

export default InspectionBasicDetailsScreen;
