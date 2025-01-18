import React from 'react';
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
    const numColumns = 3; // Broj kolona u mreži

    const renderImage = ({ item }: { item: string }) => (
        <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.gridImage} resizeMode="cover" />
        </View>
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
                                numColumns={numColumns} // Prikaži slike u mreži
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

const { width } = Dimensions.get('window');
const imageSize = (width * 0.9) / 3 - 10; // Prilagođena veličina slike za mrežu sa 3 kolone

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
});
