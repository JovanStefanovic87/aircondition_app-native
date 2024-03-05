import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DeviceStateColumnHead from '../lists/DeviceStateColumnHead';
import { customColors } from '../../assets/styles/customStyles';
import DeviceStateColumnBody from '../lists/DeviceStateColumnBody';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
    title: string;
    children: React.ReactNode;
    group: any;
}

const DeviceStateColumnContainer: React.FC<Props> = ({ title, children, group }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToggleHeight = () => {
        setIsOpen(!isOpen);
    };

    const deviceState = group.titleComponents.map((title: any) =>
        title.deviceStateComponents.map((deviceState: any) => deviceState.value),
    );

    const isCompleted = !deviceState.some((group) =>
        group.some((deviceStateValue) => deviceStateValue === null),
    );

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <DeviceStateColumnHead title={title} isCompleted={isCompleted} />
                <DeviceStateColumnBody isOpen={isOpen}>{children}</DeviceStateColumnBody>
            </View>
            <TouchableOpacity onPress={handleToggleHeight} style={styles.toggleButton}>
                <Icon name={isOpen ? 'caret-up' : 'caret-down'} size={40} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: customColors.blueLight,
        width: '100%',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    innerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    toggleButton: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%',
    },
});

export default DeviceStateColumnContainer;
