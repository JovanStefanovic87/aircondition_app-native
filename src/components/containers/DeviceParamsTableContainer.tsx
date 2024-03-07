import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CollapsibleTableHead from '../table/CollapsibleTableHead';
import CollapsibleTableBody from '../table/CollapsibleTableBody';
import { Inspection } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    title?: string;
    children: React.ReactNode;
    parameters: Inspection;
}

const DeviceParamsTableContainer: React.FC<Props> = ({
    title = 'ANLAGE',
    children,
    parameters,
}) => {
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
                <CollapsibleTableHead title={title} isCompleted={isCompleted} />
                <CollapsibleTableBody isOpen={isOpen} marginTop={isOpen ? 10 : 0}>
                    {children}
                </CollapsibleTableBody>
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

export default DeviceParamsTableContainer;
