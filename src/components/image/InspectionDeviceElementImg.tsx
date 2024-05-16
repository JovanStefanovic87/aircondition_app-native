import React, { FC, useState, useEffect } from 'react';
import { InspectionDeviceElement } from '../../../database/types';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { DeviceElementImage } from '../../resources/deviceElementImages';
import Icon from 'react-native-vector-icons/Feather';
import { customColors } from '../../assets/styles/customStyles';
import { deleteInspectionDeviceElement } from '../../../database/dataAccess/Command/sqlCommands';
import { fetchInspectionDeviceElements } from '../../helpers/api';
import { useInspectionDeviceElementsStore, useInspectionStore } from '../../store/store';
import DynamicFontSizeText from '../text/DynamicFontSizeText';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

type Props = {
    deviceElement: InspectionDeviceElement;
    onFocusChange: (deviceId: string, focused: boolean) => void;
    isFocused: boolean;
    onDeleteElement: (deletedElementId: string) => void;
    moveLeft: (element: InspectionDeviceElement) => void;
    moveRight: (element: InspectionDeviceElement) => void;
};

const InspectionDeviceElementImg: FC<Props> = ({
    deviceElement,
    onFocusChange,
    isFocused,
    onDeleteElement,
    moveLeft,
    moveRight,
}) => {
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [modalVisible, setModalVisible] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    /* const inspectionId = useInspectionStore((state) => state.inspectionId); */
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);
    }, []);

    const hideModal = () => {
        setModalVisible(false);
    };

    const handlePressIn = () => {
        onFocusChange(deviceElement.id.toString(), true);
    };

    const handlePressOut = () => {
        onFocusChange(deviceElement.id.toString(), false);
    };

    const handleDeleteInspectionElements = async (inspectionId: string) => {
        await deleteInspectionDeviceElement(inspectionId);
    };

    const handleConfirmDelete = () => {
        if (deviceElement) {
            handleDeleteInspectionElements(deviceElement.id.toString());
            hideModal();
            onDeleteElement(deviceElement.id.toString());
            fetchUpdatedDeviceElements();
        }
    };

    const fetchUpdatedDeviceElements = () => {
        fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
    };

    return (
        <TouchableOpacity
            key={deviceElement.id}
            style={[
                styles.container,
                {
                    width: windowWidth * 0.33,
                    paddingTop: isTablet ? 0 : windowWidth * 0.05,
                    justifyContent: isTablet ? 'center' : 'flex-start',
                },
                isFocused && styles.imageFocused,
            ]}
            onPress={handlePressIn}
            onBlur={handlePressOut}
            activeOpacity={1}
        >
            <View style={styles.imageContainer}>
                {deviceElement.imageFileName && (
                    <Image
                        style={[styles.image, isFocused && styles.imageFocused]}
                        source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                        resizeMode="contain"
                    />
                )}
            </View>
            <DynamicFontSizeText fileName={deviceElement.imageFileName} isTablet={isTablet} />

            {isFocused && (
                <View style={styles.arrowContainer}>
                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={() => moveLeft(deviceElement)}
                    >
                        <Icon name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={() => moveRight(deviceElement)}
                    >
                        <Icon name="arrow-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {isFocused && (
                <TouchableOpacity style={styles.xContainer} onPress={() => setModalVisible(true)}>
                    <Icon name="x" size={24} color="white" />
                </TouchableOpacity>
            )}
            <ConfirmDeleteModal
                modalVisible={modalVisible}
                hideModal={hideModal}
                handleConfirmDelete={handleConfirmDelete}
            />
        </TouchableOpacity>
    );
};

export default InspectionDeviceElementImg;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        height: '98%',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderColor: customColors.blueDarker,
    },
    imageContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        aspectRatio: 1,
        marginBottom: 10,
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
    },
    xContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        padding: windowWidth * 0.018,
        borderRadius: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstOptionSeparator: {
        borderTopWidth: 2,
    },
    imageFocused: {
        backgroundColor: customColors.blueLightest,
        borderWidth: 2,
        borderColor: 'black',
    },
    arrowContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: windowWidth * 0.019,
        bottom: 10,
    },
    arrowButton: {
        padding: windowWidth * 0.012,
        backgroundColor: customColors.blue,
        borderRadius: 50,
    },
    option: {
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
});
