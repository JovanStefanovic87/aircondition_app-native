import React, { FC, useState, useEffect } from 'react';
import { DeviceElement } from '../../../database/types';
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

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

type Props = {
    deviceElement: DeviceElement;
    options: string[];
    onFocusChange: (deviceId: string, focused: boolean) => void;
    isFocused: boolean;
};

const DeviceElementIncludedImg: FC<Props> = ({
    deviceElement,
    options,
    onFocusChange,
    isFocused,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

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

    const handleOptionSelect = (option: string) => {
        console.log('Selected option:', option);
        hideModal();
    };

    const handlePressIn = () => {
        onFocusChange(deviceElement.id.toString(), true);
    };

    const handlePressOut = () => {
        onFocusChange(deviceElement.id.toString(), false);
    };

    return (
        <TouchableOpacity
            key={deviceElement.id}
            style={[
                styles.container,
                {
                    width: isTablet ? windowWidth * 0.33 : windowWidth,
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
            {isFocused && (
                <View style={styles.arrowContainer}>
                    <TouchableOpacity style={styles.arrowButton}>
                        <Icon name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowButton}>
                        <Icon name="arrow-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            <Text style={styles.name}>{deviceElement.name}</Text>
            {isFocused && (
                <TouchableOpacity style={styles.xContainer} onPress={showModal}>
                    <Icon name="x" size={24} color="white" />
                </TouchableOpacity>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <Pressable style={styles.modalContainer} onPress={hideModal}>
                    <View style={styles.modalContent}>
                        {options.map((option, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handleOptionSelect(option)}
                                style={[styles.option, index === 0 && styles.firstOptionSeparator]}
                            >
                                <TextTitle text={option} />
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </TouchableOpacity>
    );
};

export default DeviceElementIncludedImg;

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
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    xContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: windowWidth * 0.8,
        alignItems: 'center',
    },
    option: {
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ccc',
        width: '100%',
        alignItems: 'center',
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
        paddingHorizontal: 20,
        bottom: 10,
    },
    arrowButton: {
        padding: 10,
        backgroundColor: customColors.blue,
        borderRadius: 50,
    },
});
