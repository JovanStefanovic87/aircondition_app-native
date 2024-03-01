import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageSlider from '../sliders/ImageSlider';
import Dropdown from '../input/Dropdown';
import { customColors } from '../../assets/styles/customStyles';

interface AssemblyPartsSourceContainerProps {
    selectedTab: number;
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
    pickerPlaceholder: string;
    images: string[];
}

const AssemblyPartsSourceContainer: React.FC<AssemblyPartsSourceContainerProps> = ({
    selectedTab,
    setSelectedTab,
    pickerPlaceholder,
    images,
}) => {
    return (
        <View style={styles.container}>
            <Dropdown
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                pickerPlaceholder={pickerPlaceholder}
                items={[
                    { label: 'Tab 1', value: 'Tab 1' },
                    { label: 'Tab 2', value: 'Tab 2' },
                    { label: 'Tab 3', value: 'Tab 3' },
                ]}
            />
            <View style={styles.buttonContainer}>
                <ImageSlider images={images} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: customColors.blueLight,
        borderRadius: 8,
        padding: 20,
        maxWidth: '85%',
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
});

export default AssemblyPartsSourceContainer;
