import React, { FC, useState } from 'react';
import { InspectionDeviceElement } from '../../../database/types';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { DeviceElementImage } from '../../resources/deviceElementImages';
import Icon from 'react-native-vector-icons/Feather';
import { deleteInspectionDeviceElement } from '../../../database/dataAccess/Command/sqlCommands';
import { fetchInspectionDeviceElements } from '../../helpers/api';
import { useInspectionDeviceElementsStore, useInspectionStore } from '../../store/store';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import TextImageName from '../text/TextImageName';
import styles from '../../assets/styles/imageStyles';
import { customColors } from '../../assets/styles/customStyles';

const windowWidth = Dimensions.get('window').width;

// 🔒 JEDINO PRAVILO
const MAX_PER_SCREEN = 6;
const ELEMENT_WIDTH = windowWidth / MAX_PER_SCREEN;

type Props = {
    deviceElement: InspectionDeviceElement;
    onFocusChange: (deviceId: string, focused: boolean) => void;
    isFocused: boolean;
    onDeleteElement: (deletedElementId: string) => void;
    moveLeft: (element: InspectionDeviceElement) => void;
    moveRight: (element: InspectionDeviceElement) => void;
    isTablet?: boolean;
    index: number;
    currentIndex: number;
    selectedElementsCount: number;
};

const InspectionDeviceElementImg: FC<Props> = ({
    deviceElement,
    onFocusChange,
    isFocused,
    onDeleteElement,
    moveLeft,
    moveRight,
    isTablet,
    index,
    currentIndex,
}) => {
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [modalVisible, setModalVisible] = useState(false);
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );

    const handlePressIn = () => {
        onFocusChange(deviceElement.id.toString(), true);
    };

    const handlePressOut = () => {
        onFocusChange(deviceElement.id.toString(), false);
    };

    const fetchUpdatedDeviceElements = () => {
        fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
    };

    const handleConfirmDelete = async () => {
        await deleteInspectionDeviceElement(deviceElement.id.toString());
        setModalVisible(false);
        onDeleteElement(deviceElement.id.toString());
        fetchUpdatedDeviceElements();
    };

    function capitalizeFirstLetter(str = '') {
        const firstDotIndex = str.indexOf('.');
        const substring = firstDotIndex !== -1 ? str.substring(0, firstDotIndex) : str;
        return substring.charAt(0).toUpperCase() + substring.slice(1);
    }

    return (
        <TouchableOpacity
            key={deviceElement.id}
            style={[
                styles.inspectionElementContainer,
                {
                    width: ELEMENT_WIDTH,
                    paddingTop: isTablet ? 0 : windowWidth * 0.05,
                    justifyContent: isTablet ? 'center' : 'flex-start',
                },
                isFocused && styles.imageFocused,
                currentIndex === index && { borderColor: customColors.blueLight },
            ]}
            onPress={handlePressIn}
            onBlur={handlePressOut}
            activeOpacity={1}
        >
            <View style={styles.elementImageContainer}>
                {deviceElement.imageFileName && (
                    <Image
                        style={[
                            styles.elementImage,
                            isFocused && styles.imageFocused,
                            { width: ELEMENT_WIDTH * 0.75 },
                        ]}
                        source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                        resizeMode="contain"
                    />
                )}
            </View>

            <TextImageName
                text={capitalizeFirstLetter(deviceElement.imageFileName)}
                isTablet={isTablet}
            />

            {isFocused && (
                <View style={styles.arrowContainer}>
                    <TouchableOpacity
                        style={styles.elementArrowButton}
                        onPress={() => moveLeft(deviceElement)}
                    >
                        <Icon name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.elementArrowButton}
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
                hideModal={() => setModalVisible(false)}
                handleConfirmDelete={handleConfirmDelete}
            />
        </TouchableOpacity>
    );
};

export default InspectionDeviceElementImg;
