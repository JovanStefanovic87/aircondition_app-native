import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../buttons/IconButton';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    title: string;
    onPressCamera: () => void;
    onPressGallery: () => void;
    onPressUpload: () => void;
}

const DeviceStateTitle: React.FC<Props> = ({
    title,
    onPressCamera,
    onPressGallery,
    onPressUpload,
}) => {
    return (
        <View style={styles.iconsContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.elementName}>{title}</Text>
                <View style={styles.cameraIconsContainer}>
                    <IconButton icon="camera" onPress={onPressCamera} />
                    <IconButton icon="upload" onPress={onPressUpload} />
                    <IconButton icon="image" onPress={onPressGallery} />
                </View>
            </View>
        </View>
    );
};

export default DeviceStateTitle;

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        padding: 10,
    },
    elementName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: customColors.black,
        marginRight: 10,
    },
    cameraIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
    },
});
