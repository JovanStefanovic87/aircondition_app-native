import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import InstructionModal from '../containers/InstructionModal';

interface Props {
    title?: string;
    isCompleted?: boolean;
    name?: string;
    isSingleElement?: boolean;
    groupName?: string;
    onPressInfo?: () => void; // 🔹 novi prop
}

const CollapsibleTableHead: React.FC<Props> = ({
    title = 'Anlage',
    isCompleted = false,
    name = 'Anlage',
    isSingleElement,
    groupName,
    onPressInfo,
}) => {
    const showIcon =
        groupName === 'PHYSIKALISCH' || groupName === 'KONSTRUKTIV' || groupName === 'ANLAGE';

    const isInstructionGroup =
        groupName === 'LUFTKEIMZAHLMESSUNG' || groupName === 'MIKROBIOLOGISCH';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{title[0]?.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.title}>{title?.toUpperCase()}</Text>
                    {isSingleElement && <Text style={styles.title}>--- {name?.toUpperCase()}</Text>}
                </View>

                <View style={styles.rightIcons}>
                    {isInstructionGroup && (
                        <TouchableOpacity onPress={onPressInfo}>
                            <Icon name="info-circle" size={22} color="white" />
                        </TouchableOpacity>
                    )}
                    {showIcon && (isCompleted ? <CheckedIcon /> : <DangerIcon />)}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        backgroundColor: '#2196F3',
        paddingVertical: 2,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2196F3',
        padding: 8,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    titleContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
    },
    avatarText: {
        color: 'white',
    },
    title: {
        color: 'white',
        textTransform: 'uppercase',
    },
    instructionWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    instructionBubble: {
        maxWidth: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
});

export default CollapsibleTableHead;
