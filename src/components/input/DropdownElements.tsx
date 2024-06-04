import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, DimensionValue, Dimensions } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';
import Dropdown from './Dropdown';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

interface Props {
    selectedValue: number;
    setSelectedValue: (value: number) => void;
    items: { value: string | number; label: string }[];
    isValid?: boolean;
    maxWidth?: DimensionValue;
}

const DropdownElements: FC<Props> = ({
    selectedValue,
    setSelectedValue,
    items,
    isValid = true,
    maxWidth = 400,
}) => {
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);

        if (!selectedValue && items.length > 0) {
            setSelectedValue(items[0].value as number);
        }
    }, []);

    const styles = StyleSheet.create({
        dropdownContainer: {
            width: '35%',
            maxWidth: maxWidth,
            borderColor: isValid ? customColors.modalBackground : 'red',
            borderWidth: 2,
            borderRadius: 5,
            justifyContent: 'center',
            color: customColors.modalBackground,
        },
    });

    return (
        <View style={[styles.dropdownContainer]}>
            <Dropdown
                selectedValue={
                    selectedValue || (items.length > 0 ? (items[0].value as number) : null)
                }
                setSelectedValue={setSelectedValue}
                items={items}
                isValid={isValid}
                maxWidth={maxWidth}
            />
        </View>
    );
};

export default DropdownElements;
