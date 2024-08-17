import React, { FC, useState } from 'react';
import { InspectionDeviceElement } from '../../../database/types';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { DeviceElementImage } from '../../resources/deviceElementImages';
import Icon from 'react-native-vector-icons/Feather';
import { deleteInspectionDeviceElement } from '../../../database/dataAccess/Command/sqlCommands';
import { fetchInspectionDeviceElements } from '../../helpers/api';
import { useInspectionDeviceElementsStore, useInspectionStore } from '../../store/store';
import TextImageName from '../text/TextImageName';
import styles from '../../assets/styles/imageStyles';
import { customColors } from '../../assets/styles/customStyles';

const windowWidth = Dimensions.get('window').width;

type Props = {
    deviceElement: InspectionDeviceElement;
    onFocusChange: (deviceId: string, focused: boolean, deviceElementId?: string) => void;
    isFocused: boolean;
    isTablet?: boolean;
    index: number;
    currentIndex: number;
};

const InspectionDeviceElementImgMerged: FC<Props> = ({
    deviceElement,
    onFocusChange,
    isFocused,
    isTablet,
    index,
    currentIndex,
}) => {
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [modalVisible, setModalVisible] = useState(false);
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );

    const hideModal = () => {
        setModalVisible(false);
    };

    const handlePressIn = () => {
        onFocusChange(deviceElement.id.toString(), true, deviceElement.id);
    };

    const handlePressOut = () => {
        onFocusChange(deviceElement.id.toString(), false, deviceElement.id);
    };

    const handleDeleteInspectionElements = async (inspectionId: string) => {
        await deleteInspectionDeviceElement(inspectionId);
    };

    const fetchUpdatedDeviceElements = () => {
        fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
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
                    width: windowWidth * 0.33,
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
                        style={[styles.elementImage, isFocused && styles.imageFocused]}
                        source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                        resizeMode="contain"
                    />
                )}
            </View>
            <TextImageName
                text={capitalizeFirstLetter(deviceElement.imageFileName)}
                isTablet={isTablet}
            />
        </TouchableOpacity>
    );
};

export default InspectionDeviceElementImgMerged;
