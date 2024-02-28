import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../buttons/IconButton';
import { customColors } from '../../assets/styles/customStyles';

const InspectionTitle = ({ title, onPressCamera, onPressGallery }) => {
    return (
        <View style={styles.iconsContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.elementName}>{title}</Text>
                <View style={styles.cameraIconsContainer}>
                    <IconButton icon="camera" onPress={onPressCamera} />
                    <IconButton icon="image" onPress={onPressGallery} />
                </View>
            </View>
        </View>
    );
};

export default InspectionTitle;

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        padding: 10,
    },
    elementName: {
        flex: 1,
        minWidth: '60%',
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        color: customColors.black,
    },
    cameraIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        maxWidth: '40%',
    },
});
