import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import EmojisColumnHead from '../lists/EmojisColumnHead';
import { customColors } from '../../assets/styles/customStyles';
import EmojisColumnBody from '../lists/EmojisColumnBody';
import Icon from 'react-native-vector-icons/FontAwesome';

interface EmojisColumnContainerProps {
    title: string;
    children: React.ReactNode;
    isComplited?: boolean;
}

const EmojisColumnContainer: React.FC<EmojisColumnContainerProps> = ({
    title,
    children,
    isComplited,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToggleHeight = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <EmojisColumnHead title={title} isCompleted={isComplited} />
                <EmojisColumnBody isOpen={isOpen}>{children}</EmojisColumnBody>
            </View>
            <TouchableOpacity onPress={handleToggleHeight} style={styles.toggleButton}>
                <Icon name={isOpen ? 'caret-up' : 'caret-down'} size={40} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: customColors.blueLight,
        width: '100%',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    innerContainer: {
        flex: 1,
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

export default EmojisColumnContainer;
