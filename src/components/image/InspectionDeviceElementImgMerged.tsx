import React, { FC, useEffect, useState } from 'react';
import { DeviceElementCompletionState, InspectionDeviceElement } from '../../../database/types';
import { View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import { DeviceElementImage } from '../../resources/deviceElementImages';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';
import TextImageName from '../text/TextImageName';
import { customColors } from '../../assets/styles/customStyles';
import styles from '../../assets/styles/imageStyles';

const windowWidth = Dimensions.get('window').width;

type Props = {
    deviceElement: InspectionDeviceElement;
    onFocusChange: (deviceId: string, focused: boolean, deviceElementId?: string) => void;
    isFocused: boolean;
    isTablet?: boolean;
    index: number;
    currentIndex: number;
    deviceElementCompleted: DeviceElementCompletionState[];
};

const InspectionDeviceElementImgMerged: FC<Props> = ({
    deviceElement,
    onFocusChange,
    isFocused,
    isTablet,
    index,
    currentIndex,
    deviceElementCompleted,
}) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const handlePressIn = () => {
        onFocusChange(deviceElement.id.toString(), true, deviceElement.id);
    };

    const handlePressOut = () => {
        onFocusChange(deviceElement.id.toString(), false, deviceElement.id);
    };

    useEffect(() => {
        const completionStatus = deviceElementCompleted.find(
            (entry) => entry.inspectionDeviceElementId === deviceElement.id,
        );

        setIsCompleted(completionStatus ? completionStatus.isCompleted : false);
    }, [deviceElement, deviceElementCompleted]);

    return (
        <TouchableOpacity
            key={deviceElement.id}
            style={[
                styles.inspectionElementContainer,
                {
                    width: windowWidth * 0.33,
                    paddingTop: isTablet ? 0 : windowWidth * 0.05,
                    justifyContent: isTablet ? 'center' : 'flex-start',
                },
                isFocused && styles.imageFocused,
                currentIndex === index && { borderColor: customColors.blueLight },
            ]}
            onPress={handlePressIn}
            onBlur={handlePressOut}
            activeOpacity={1}
        >
            <View style={styles.elementImageContainer}>
                {deviceElement.imageFileName && (
                    <Image
                        style={[styles.elementImage, isFocused && styles.imageFocused]}
                        source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                        resizeMode="contain"
                    />
                )}
            </View>
            {isCompleted ? <CheckedIcon /> : <DangerIcon />}
            <TextImageName
                text={deviceElement.imageFileName?.split('.')[0]?.toUpperCase()}
                isTablet={isTablet}
            />
        </TouchableOpacity>
    );
};

export default InspectionDeviceElementImgMerged;
