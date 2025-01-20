import React, { useState } from 'react';
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

interface Props {
    visible: boolean;
    images: string[];
    onClose: () => void;
    title: string;
}

const GalleryModal: React.FC<Props> = ({ visible, images, onClose, title }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const numColumns = 3;

    const renderImage = ({ item }: { item: string }) => (
        <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: item }} style={styles.gridImage} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    );

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
                                numColumns={numColumns}
                                contentContainerStyle={styles.gridContainer}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Modal za prikaz slike u punoj veličini */}
                    {selectedImage && (
                        <Modal visible={true} transparent={true} animationType="fade">
                            <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
                                <View style={styles.fullScreenOverlay}>
                                    <Image
                                        source={{ uri: selectedImage }}
                                        style={styles.fullScreenImage}
                                        resizeMode="contain"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setSelectedImage(null)}
                                        style={styles.fullScreenCloseButton}
                                    >
                                        <Text style={styles.fullScreenCloseButtonText}>✕</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default GalleryModal;

const { width } = Dimensions.get('window');
const imageSize = (width * 0.9) / 3 - 10;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '92%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
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
        width: imageSize,
        height: imageSize,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    fullScreenOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '90%',
        height: '80%',
    },
    fullScreenCloseButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenCloseButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
