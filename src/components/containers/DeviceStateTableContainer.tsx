import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CollapsibleTableHead from '../table/CollapsibleTableHead';
import CollapsibleTableBody from '../table/CollapsibleTableBody';
import {
    DeviceStateComponentsForInspection,
    TitleComponent,
    DeviceStateComponent,
} from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    title?: string;
    children: React.ReactNode;
    group: DeviceStateComponentsForInspection;
    setIsGroupCompleted: (value: boolean) => void;
}

const DeviceStateTableContainer: React.FC<Props> = ({
    title = 'ANLAGE',
    children,
    group,
    setIsGroupCompleted,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const deviceState = group.titleComponents.map((title: TitleComponent) =>
            title.deviceStateComponents.map(
                (deviceState: DeviceStateComponent) => deviceState.value,
            ),
        );

        const isCompleted = !deviceState.some((group) =>
            group.some((deviceStateValue) => deviceStateValue === null),
        );

        setIsGroupCompleted(isCompleted);
    }, [group]);

    const handleToggleHeight = () => {
        setIsOpen(!isOpen);
    };

    const deviceState = group.titleComponents.map((title: TitleComponent) =>
        title.deviceStateComponents.map((deviceState: DeviceStateComponent) => deviceState.value),
    );

    const isCompleted = !deviceState.some((group) =>
        group.some((deviceStateValue) => deviceStateValue === null),
    );

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <CollapsibleTableHead title={title} isCompleted={isCompleted} />
                <CollapsibleTableBody isOpen={isOpen}>{children}</CollapsibleTableBody>
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

export default DeviceStateTableContainer;
