import React, { FC, useState } from 'react';
import { DeviceElement, InspectionDeviceElementUpdate } from '../../../database/types';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { DeviceElementImage } from '../../resources/deviceElementImages';
import styles from '../../assets/styles/imageStyles';
import { saveInspectionDeviceElement } from '../../../database/dataAccess/Command/sqlCommands';
import { fetchInspectionDeviceElements } from '../../helpers/api';
import { useInspectionStore, useInspectionDeviceElementsStore } from '../../store/store';
import TextImageName from '../text/TextImageName';
import ModalOptions from '../modals/ModalOptions';
import ErrorInformationModal from '../modals/ErrorInformationModal';

const windowWidth = Dimensions.get('window').width;

type Props = {
    deviceElement: DeviceElement;
    options: { id: number; value: string }[];
    selectedElementsCount: number;
    isTablet?: boolean;
};

const DeviceElementImg: FC<Props> = ({
    deviceElement,
    options,
    selectedElementsCount,
    isTablet,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const inspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.inspectionDeviceElements,
    );
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleOptionSelect = async (option: { id: number; value: string }) => {
        const deviceElementsByPosition = inspectionDeviceElements.filter(
            (element) => element.elementPositionId === option.id,
        );
        try {
            const record: InspectionDeviceElementUpdate = {
                inspectionId: inspectionId,
                deviceElementId: deviceElement.id,
                deviceOrder: deviceElementsByPosition.length + 1,
                elementPositionId: option.id,
            };
            await saveInspectionDeviceElement(record);
            fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
            hideModal();
        } catch (error) {
            setErrorMessage(error.message);
            setErrorModalVisible(true);
        }
    };

    const calculateWidth = (selectedElementsCount: number) => {
        const elementsPerRow = Math.min(Math.ceil(selectedElementsCount / 2), 8);
        return windowWidth / elementsPerRow;
    };

    const calculateImageSize = (selectedElementsCount: number) => {
        return calculateWidth(selectedElementsCount) * 0.75;
    };

    return (
        <TouchableOpacity
            key={deviceElement.id}
            style={[
                styles.elementContainer,
                {
                    width: calculateWidth(selectedElementsCount),
                },
            ]}
            onPress={showModal}
        >
            <View style={styles.elementImageContainer}>
                {deviceElement.imageFileName && (
                    <Image
                        style={{
                            width: calculateImageSize(selectedElementsCount),
                            height: windowWidth * 0.1,
                            aspectRatio: 1,
                        }}
                        source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                        resizeMode="contain"
                    />
                )}
            </View>
            <TextImageName text={deviceElement.name} isTablet={isTablet} />
            <ModalOptions
                options={options}
                modalVisible={modalVisible}
                hideModal={hideModal}
                handleOptionSelect={handleOptionSelect}
            />
            <ErrorInformationModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
        </TouchableOpacity>
    );
};

export default DeviceElementImg;
