import React, { FC, useState } from 'react';
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

const windowWidth = Dimensions.get('window').width;

type Props = {
    deviceElement: DeviceElement;
};

const DeviceElementImg: FC<Props> = ({ deviceElement }) => {
    const [modalVisible, setModalVisible] = useState(false);

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

    return (
        <View key={deviceElement.id} style={styles.container}>
            {deviceElement.imageFileName && (
                <Image
                    style={[styles.image, { width: windowWidth }]}
                    source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                    resizeMode="contain"
                />
            )}
            <Text style={styles.name}>{deviceElement.name}</Text>
            <TouchableOpacity style={styles.plusContainer} onPress={showModal}>
                <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable
                            onPress={() => handleOptionSelect('Option 1')}
                            style={styles.option}
                        >
                            <Text>Option 1</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => handleOptionSelect('Option 2')}
                            style={styles.option}
                        >
                            <Text>Option 2</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => handleOptionSelect('Option 3')}
                            style={styles.option}
                        >
                            <Text>Option 3</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
        padding: 20,
        marginBottom: 20,
        width: windowWidth,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderColor: customColors.blueLight,
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
    plusContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
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
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
