import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';

const CollapsibleTableBody = ({ title = 'Anlage', isCompleted = false }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{title[0].toUpperCase()}</Text>
                    </View>
                    <Text style={styles.title}>{title.toUpperCase()}</Text>
                </View>
                {isCompleted ? <CheckedIcon /> : <DangerIcon />}
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
});

export default CollapsibleTableBody;
