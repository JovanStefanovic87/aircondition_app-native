/**
 * FIRST PAGE OF INSPECTION
 * Creating a new inspection with basic details
 * Input fields for barcode, device type, facility name, location, inspection type, contract number
 */

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
import { InspectionUpdate } from '../../database/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import BarcodeScanner from '../components/camera/BarcodeScanner';
import InputText from '../components/input/InputText';
import IconButton from '../components/buttons/IconButton';
import DropdownWithValidation from '../components/input/DropdownWithValidation';
import PrimaryButton from '../components/buttons/PrimaryButton';
import {
    getDeviceTypes,
    getInspectionTypes,
    getInspectionById,
} from '../../database/dataAccess/Query/sqlQueries';
import { getStoredUser } from '../../database/dataAccess/Helper/auth';
import { saveInspection } from '../../database/dataAccess/Command/sqlCommands';
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
        clientName: '',
        clientAddress: '',
        clientCity: '',
        endClientName: '',
        endClientAddress: '',
        endClientCity: '',
        barcode: '',
        deviceTypeId: null,
        inspectionTypeId: null,
        facilityName: '',
        location: '',
        contractNumber: '',
        createdAt: '',
        inspectionDate: '',
        userId: '',
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

            if (!form.userId) {
                const storedUser = await getStoredUser();
                console.log('Ulogovani korisnik:', storedUser); //ovde dobijam null
                const userId = storedUser?.id ?? '';
                if (!userId) {
                    console.log('Fehler: Kein Benutzer angemeldet');
                    return;
                }
                setForm((prevForm) => ({ ...prevForm, userId }));
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchInspectionData = async () => {
            if (!inspectionId) return;

            const inspectionData = await getInspectionById(inspectionId);
            const storedUser = await getStoredUser();
            const fallbackUserId = storedUser?.id ?? '';

            if (inspectionData) {
                setForm({
                    clientName: inspectionData.clientName ?? '',
                    clientAddress: inspectionData.clientAddress ?? '',
                    clientCity: inspectionData.clientCity ?? '',
                    endClientName: inspectionData.endClientName ?? '',
                    endClientAddress: inspectionData.endClientAddress ?? '',
                    endClientCity: inspectionData.endClientCity ?? '',
                    barcode: inspectionData.barcode ?? '',
                    deviceTypeId: inspectionData.deviceTypeId ?? null,
                    inspectionTypeId: inspectionData.inspectionTypeId ?? null,
                    facilityName: inspectionData.facilityName ?? '',
                    location: inspectionData.location ?? '',
                    contractNumber: inspectionData.contractNumber ?? '',
                    createdAt: inspectionData.createdAt ?? '',
                    inspectionDate: inspectionData.inspectionDate ?? '',
                    userId: inspectionData.userId ?? fallbackUserId,
                    inspectionStatusId: inspectionData.inspectionStatusId ?? 0,
                });
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
                                <TextMain text="ANLAGE-ID:" isBold />
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
                                <TextMain text="GERÄTEINFORMATION:" isBold />
                                <TableContainer>
                                    <DropdownWithValidation
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
                                        placeholder="Name der Anlage"
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
                                    <DropdownWithValidation
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
                                <TextMain text="NUMMER DER LEISTUNGSNACHWEIS:" isBold />
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

                            <View style={styles.inputGroupContainer}>
                                <TextMain text="ClIENT DATA:" isBold />
                                <TableContainer>
                                    <View style={styles.section}>
                                        <TextMain text="Kunde" />
                                        <InputText
                                            placeholder="Kunde"
                                            value={form.clientName}
                                            setValue={(value) =>
                                                setForm({ ...form, clientName: value })
                                            }
                                        />

                                        <TextMain text="Adresse des Kunden" />
                                        <InputText
                                            placeholder="Adresse des Kunden"
                                            value={form.clientAddress}
                                            setValue={(value) =>
                                                setForm({ ...form, clientAddress: value })
                                            }
                                        />

                                        <TextMain text="Stadt des Kunden" />
                                        <InputText
                                            placeholder="Stadt des Kunden"
                                            value={form.clientCity}
                                            setValue={(value) =>
                                                setForm({ ...form, clientCity: value })
                                            }
                                        />

                                        <TextMain text="Endkunde" />
                                        <InputText
                                            placeholder="Endkunde"
                                            value={form.endClientName}
                                            setValue={(value) =>
                                                setForm({ ...form, endClientName: value })
                                            }
                                        />

                                        <TextMain text="Adresse des Endkunden" />
                                        <InputText
                                            placeholder="Adresse des Endkunden"
                                            value={form.endClientAddress}
                                            setValue={(value) =>
                                                setForm({ ...form, endClientAddress: value })
                                            }
                                        />

                                        <TextMain text="Stadt des Endkunden" />
                                        <InputText
                                            placeholder="Stadt des Endkunden"
                                            value={form.endClientCity}
                                            setValue={(value) =>
                                                setForm({ ...form, endClientCity: value })
                                            }
                                        />

                                        <TextMain text="Inspektionsdatum" />
                                        <InputText
                                            placeholder="Inspektionsdatum"
                                            value={form.inspectionDate}
                                            setValue={(value) =>
                                                setForm({ ...form, inspectionDate: value })
                                            }
                                        />
                                    </View>
                                </TableContainer>
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
    section: {
        width: '100%',
        gap: 8,
        marginTop: 16,
    },
});

export default InspectionBasicDetailsScreen;
