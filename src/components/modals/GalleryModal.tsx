import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { ImageGallery } from '../../../database/types';
import {
    deleteDeviceElementImage,
    deleteDeviceStateImage,
    deleteInspectionImage,
} from '../../../database/dataAccess/Command/sqlCommands';
import IconOverImageButton from '../buttons/IconOverImageButton';

interface Props {
    visible: boolean;
    images: ImageGallery[];
    onClose: () => void;
    title: string;
}

const { width } = Dimensions.get('window'); // Širina ekrana

const GalleryModal: React.FC<Props> = ({ visible, images, onClose, title }) => {
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }[]>([]);

    // Funkcija za dobavljanje originalnih dimenzija slike
    const getImageDimensions = (uri: string, index: number) => {
        Image.getSize(uri, (width, height) => {
            setImageDimensions((prevState) => {
                const updatedDimensions = [...prevState];
                updatedDimensions[index] = { width, height };
                return updatedDimensions;
            });
        });
    };

    useEffect(() => {
        images.forEach((image, index) => {
            getImageDimensions(image.imagePath, index);
        });
    }, [images]);

    const deleteImage = (image: ImageGallery) => {
        switch (image.imageType) {
            case 'Inspection_Image':
                deleteInspectionImage(image.imageId);
                return;
            case 'DeviceElement_Image':
                deleteDeviceElementImage(image.imageId);
                return;
            case 'DeviceState_Title_Group_Image':
                deleteDeviceStateImage(image.imageId);
                return;
        }
    };

    const renderImage = ({ item, index }: { item: ImageGallery; index: number }) => {
        const dimensions = imageDimensions[index];
        const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1;

        return (
            <ReactNativeZoomableView
                style={styles.modalContainer}
                minZoom={1}
                maxZoom={7}
                zoomStep={0.5}
            >
                <TouchableOpacity onPress={() => {}} activeOpacity={1}>
                    <View
                        style={[
                            styles.imageWrapper,
                            {
                                width: width - 30, // Širina wrapper-a
                                height: (width - 30) / aspectRatio, // Visina wrapper-a na osnovu odnosa širine i visine
                            },
                        ]}
                    >
                        <Image
                            source={{ uri: item.imagePath }}
                            style={styles.gridImage}
                            resizeMode="contain"
                        />
                        <IconOverImageButton
                            icon="trash"
                            onPress={() => deleteImage(item)}
                            style={styles.trashIcon}
                        />
                    </View>
                </TouchableOpacity>
            </ReactNativeZoomableView>
        );
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.header}>
                                <Text style={styles.modalTitle}>{title}</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={images}
                                renderItem={renderImage}
                                keyExtractor={(_, index) => index.toString()}
                                numColumns={1}
                                contentContainerStyle={styles.gridContainer}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default GalleryModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#2196F3',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    closeButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    gridContainer: {
        padding: 10,
    },
    imageWrapper: {
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        position: 'relative',
    },
    zoomableImageContainer: {
        width: '100%',
        height: '100%',
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    trashIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 20,
    },
});
