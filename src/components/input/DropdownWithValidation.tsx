import React, { FC, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    DimensionValue,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors } from '../../assets/styles/customStyles';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

interface DropdownItem {
    value: string | number;
    label: string;
}

interface Props {
    selectedValue: number;
    setSelectedValue: (value: number) => void;
    items: DropdownItem[];
    pickerPlaceholder?: string | number;
    isValid?: boolean;
    maxWidth?: DimensionValue;
}

const DropdownWithValidation: FC<Props> = ({
    selectedValue,
    setSelectedValue,
    items,
    pickerPlaceholder,
    isValid = true,
    maxWidth = 400,
}) => {
    const [isTablet, setIsTablet] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const borderColor = isValid ? customColors.blueLight : 'red';
    const placeholderLabel = pickerPlaceholder || 'Select Item';
    const INPUT_FONT_SIZE = isTablet ? 22 : 16;
    const MODAL_FONT_SIZE = isTablet ? 22 : 16;
    const INPUT_HEIGHT = isTablet ? 'auto' : 40;

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);
    }, []);

    const styles = StyleSheet.create({
        dropdownContainer: {
            width: '100%',
            maxWidth: maxWidth,
            borderColor: borderColor,
            borderWidth: 2,
            borderRadius: 5,
        },
        dropdownButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: INPUT_HEIGHT,
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        selectedItemText: {
            color: customColors.blueLight,
            fontSize: INPUT_FONT_SIZE,
        },
        placeholderText: {
            color: customColors.placeholder,
            fontSize: INPUT_FONT_SIZE,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: customColors.modalBackground,
        },
        modalContent: {
            backgroundColor: customColors.modalBackground,
            borderRadius: 5,
            padding: 20,
            width: '80%',
            maxHeight: '60%',
        },
        dropdownItem: {
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: customColors.placeholder,
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#fff',
        },
        modalSelectedItemText: {
            color: customColors.blueLight,
            fontSize: MODAL_FONT_SIZE,
        },
        modalPlaceholderText: {
            color: customColors.black,
            fontSize: MODAL_FONT_SIZE,
        },
        arrowIcon: {
            marginLeft: 10,
        },
    });

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleSelectItem = (item: DropdownItem) => {
        setSelectedValue(item.value as number);
        setIsModalVisible(false);
    };

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
                <Text style={selectedValue ? styles.selectedItemText : styles.placeholderText}>
                    {selectedValue
                        ? items.find((item) => item.value === selectedValue)?.label
                        : placeholderLabel}
                </Text>
                <Icon name="chevron-down" size={20} color="#888" style={styles.arrowIcon} />
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        {items.map((item) => (
                            <TouchableOpacity
                                key={item.value.toString()}
                                onPress={() => handleSelectItem(item)}
                                style={styles.dropdownItem}
                            >
                                <Text
                                    style={
                                        selectedValue === item.value
                                            ? styles.modalSelectedItemText
                                            : styles.modalPlaceholderText
                                    }
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default DropdownWithValidation;
