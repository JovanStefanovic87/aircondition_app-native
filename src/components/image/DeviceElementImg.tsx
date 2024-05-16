import React, { FC, useState, useEffect } from 'react';
import { DeviceElement, InspectionDeviceElementUpdate } from '../../../database/types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions,
} from 'react-native';
import { DeviceElementImage } from '../../resources/deviceElementImages';
import Icon from 'react-native-vector-icons/Feather';
import { customColors } from '../../assets/styles/customStyles';
import TextTitle from '../text/TextTitle';
import { saveInspectionDeviceElement } from '../../../database/dataAccess/Command/sqlCommands';
import { fetchInspectionDeviceElements } from '../../helpers/api';
import { useInspectionStore, useInspectionDeviceElementsStore } from '../../store/store';
import TextBold20 from '../text/TextBold20';
import ModalOptions from '../modals/ModalOptions';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

type Props = {
    deviceElement: DeviceElement;
    options: { id: number; value: string }[];
};

const DeviceElementImg: FC<Props> = ({ deviceElement, options }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const inspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.inspectionDeviceElements,
    );
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);
    }, []);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleOptionSelect = async (option: { id: number; value: string }) => {
        const deviceElelemtsByPosition = inspectionDeviceElements.filter(
            (element) => element.elementPositionId === option.id,
        );
        try {
            console.log('Selected option:', option);
            const record: InspectionDeviceElementUpdate = {
                inspectionId: inspectionId,
                deviceElementId: deviceElement.id,
                deviceOrder: deviceElelemtsByPosition.length + 1,
                elementPositionId: option.id,
            };
            await saveInspectionDeviceElement(record);
            fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
            hideModal();
        } catch (error) {
            console.error('Error saving inspection device element:', error);
            throw error;
        }
    };

    return (
        <View
            key={deviceElement.id}
            style={[
                styles.container,
                {
                    width: isTablet ? windowWidth * 0.33 : windowWidth,
                },
            ]}
        >
            <View style={styles.imageContainer}>
                {deviceElement.imageFileName && (
                    <Image
                        style={styles.image}
                        source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                        resizeMode="contain"
                    />
                )}
            </View>
            <TextBold20 text={deviceElement.name} />
            <TouchableOpacity style={styles.plusContainer} onPress={showModal}>
                <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
            <ModalOptions
                options={options}
                modalVisible={modalVisible}
                hideModal={hideModal}
                handleOptionSelect={handleOptionSelect}
            />
        </View>
    );
};

export default DeviceElementImg;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
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
        height: windowWidth * 0.5,
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
        width: windowWidth * 0.3,
        height: windowWidth * 0.3,
        aspectRatio: 1,
        marginBottom: 10,
    },
    plusContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: customColors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        bottom: 10,
    },
    arrowButton: {
        padding: 10,
        backgroundColor: customColors.blue,
        borderRadius: 50,
    },
});
