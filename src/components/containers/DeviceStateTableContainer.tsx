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
import { NON_VERIFICATION_GROUP_TYPES } from '../../helpers/constants';

interface Props {
    title?: string;
    children: React.ReactNode;
    group: DeviceStateComponentsForInspection;
    setIsGroupCompleted: (value: boolean) => void;
    isSingleElement?: boolean;
}

const DeviceStateTableContainer: React.FC<Props> = ({
    title = 'ANLAGE',
    children,
    group,
    setIsGroupCompleted,
    isSingleElement = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const checkIsGroupCompleted = () => {
        return (
            NON_VERIFICATION_GROUP_TYPES.includes(title) ||
            group.titleComponents.every((title: TitleComponent) =>
                title.deviceStateComponents.every(
                    (deviceState: DeviceStateComponent) =>
                        deviceState.value !== null && deviceState.value !== undefined,
                ),
            )
        );
    };

    useEffect(() => {
        const isCompleted = checkIsGroupCompleted();

        setIsGroupCompleted(isCompleted);
    }, [group]);

    const handleToggleHeight = () => {
        setIsOpen(!isOpen);
    };

    const isCompleted = checkIsGroupCompleted();

    const groupName = group.titleComponents.length > 0 ? group.titleComponents[0].name : 'No Name';

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <CollapsibleTableHead
                    title={title}
                    name={groupName}
                    isCompleted={isCompleted}
                    isSingleElement={isSingleElement}
                    groupName={group.groupTypeName}
                />
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
