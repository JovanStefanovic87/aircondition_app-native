import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DeviceStateColumnHead from '../lists/DeviceStateColumnHead';
import { customColors } from '../../assets/styles/customStyles';
import DeviceStateColumnBody from '../lists/DeviceStateColumnBody';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Inspection } from '../../../database/types';

interface Props {
    title?: string;
    children: React.ReactNode;
    parameters: Inspection;
}

const DeviceParametersContainer: React.FC<Props> = ({ title = 'ANLAGE', children, parameters }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const handleToggleHeight = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const checkCompletion = () => {
            setIsCompleted(
                parameters.airVolume !== null &&
                    parameters.constructionYear !== null &&
                    parameters.lastMaintenance !== (null || ''),
            );
        };

        checkCompletion();
    }, [parameters]);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <DeviceStateColumnHead title={title} isCompleted={isCompleted} />
                <DeviceStateColumnBody isOpen={isOpen} marginTop={isOpen ? 10 : 0}>
                    {children}
                </DeviceStateColumnBody>
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

export default DeviceParametersContainer;
