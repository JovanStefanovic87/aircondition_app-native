import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
    visible: boolean;
    onClose: () => void;
    title: string;
    description: string;
    items: string[];
    example: string;
    logicTitle: string;
    logic: string[];
}

const InstructionModal: React.FC<Props> = ({
    visible,
    onClose,
    title,
    description,
    items,
    example,
    logicTitle,
    logic,
}) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Icon name="info-circle" size={22} color="#2196F3" />
                            <Text style={styles.title}>{title}</Text>
                        </View>

                        {/* Description */}
                        <Text style={styles.description}>{description}</Text>

                        {/* Items */}
                        {items.map((item, idx) => (
                            <View key={idx} style={styles.itemRow}>
                                <View style={styles.bullet} />
                                <Text style={styles.item}>{item}</Text>
                            </View>
                        ))}

                        {/* Example */}
                        <Text style={styles.section}>Beispiel:</Text>
                        <Text style={styles.example}>{example}</Text>

                        {/* Logic */}
                        <Text style={styles.section}>{logicTitle}</Text>
                        {logic.map((l, idx) => (
                            <Text key={idx} style={styles.logic}>
                                {l}
                            </Text>
                        ))}
                    </ScrollView>

                    {/* Close button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Schließen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '92%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 18,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        color: '#222',
        flexShrink: 1,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    bullet: {
        width: 6,
        height: 6,
        backgroundColor: '#2196F3',
        borderRadius: 3,
        marginTop: 6,
        marginRight: 8,
    },
    item: {
        fontSize: 14,
        color: '#333',
        flexShrink: 1,
    },
    section: {
        fontWeight: '600',
        fontSize: 15,
        marginTop: 14,
        marginBottom: 4,
        color: '#222',
    },
    example: {
        fontFamily: 'monospace',
        backgroundColor: '#f4f4f4',
        padding: 8,
        borderRadius: 6,
        marginVertical: 6,
        fontSize: 14,
        color: '#111',
    },
    logic: {
        fontSize: 14,
        color: '#444',
        marginLeft: 4,
        marginBottom: 2,
    },
    closeButton: {
        marginTop: 14,
        alignSelf: 'center',
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    closeText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
});

export default InstructionModal;
