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
import InstructionModal from './InstructionModal';

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
    const [showInstructions, setShowInstructions] = useState(false);

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
                    onPressInfo={() => setShowInstructions(true)} // Head samo trigeruje
                />
                <CollapsibleTableBody isOpen={isOpen}>{children}</CollapsibleTableBody>
            </View>

            <TouchableOpacity onPress={handleToggleHeight} style={styles.toggleButton}>
                <Icon name={isOpen ? 'caret-up' : 'caret-down'} size={40} color="black" />
            </TouchableOpacity>

            {/* 🔹 Sve vezano za bubble je ovde */}
            {showInstructions && (
                <View style={styles.instructionWrapper}>
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setShowInstructions(false)}
                    />
                    <View style={styles.instructionBubble}>
                        {group.groupTypeName === 'LUFTKEIMZAHLMESSUNG' && (
                            <InstructionModal
                                visible={showInstructions}
                                onClose={() => setShowInstructions(false)}
                                title="Anleitung zur Eingabe von Messungen (Typ L)"
                                description="Der Eingabewert besteht aus drei Teilen, die mit Bindestrichen getrennt sind:"
                                items={[
                                    'Probennummer (z. B. 838838383883)',
                                    'Erste Messung (z. B. 50/30/20)',
                                    'Zweite Messung (z. B. 40/20/5)',
                                ]}
                                example="838838383883-50/30/20-40/20/5"
                                logicTitle="Logik der Farbanzeige im PDF-Bericht:"
                                logic={[
                                    'Ist der Wert der ersten Messung größer → grün',
                                    'Ist er kleiner oder gleich → rot',
                                ]}
                            />
                        )}

                        {group.groupTypeName === 'MIKROBIOLOGISCH' && (
                            <InstructionModal
                                visible={showInstructions}
                                onClose={() => setShowInstructions(false)}
                                title="Anleitung zur Eingabe von Messungen (Typ M)"
                                description="Der Eingabewert besteht aus zwei Teilen, die mit einem Bindestrich getrennt sind:"
                                items={[
                                    'Probennummer (z. B. 93939393993)',
                                    'Messwerte (z. B. 73/87/34)',
                                ]}
                                example="93939393993-73/87/34"
                                logicTitle="Logik der Farbanzeige im PDF-Bericht:"
                                logic={[
                                    '≤ 24 → grün',
                                    '25–49 → gelb',
                                    '50–99 → orange',
                                    '≥ 100 → rot',
                                ]}
                            />
                        )}
                    </View>
                </View>
            )}
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

export default DeviceStateTableContainer;
