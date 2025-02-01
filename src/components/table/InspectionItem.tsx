import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Button, Modal } from 'react-native';
import PDF from 'react-native-pdf';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import CheckedIcon from '../icons/svg/Checked';
import DangerIcon from '../icons/svg/DangerIcon';
import { customColors } from '../../assets/styles/customStyles';
import { InspectionUpdate } from '../../../database/types';
import TextMain from '../text/TextMain';

interface Props {
    inspection: InspectionUpdate;
    onPress?: (id: string) => void;
}

const InspectionItem: React.FC<Props> = ({ inspection, onPress }) => {
    const [pdfPath, setPdfPath] = useState<string | null>(null);
    const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);

    const createPDF = async () => {
        const htmlContent = `
            <html>
                <body>
                    <h1>Inspection Report</h1>
                    <p><strong>Name der Anlage:</strong> ${inspection.facilityName}</p>
                    <p><strong>Ausftellungsort:</strong> ${inspection.location}</p>
                    <p><strong>Anlage-Id:</strong> ${inspection.barcode}</p>
                    <p><strong>Nummer der Leistungsnachweis:</strong> ${inspection.contractNumber}</p>
                </body>
            </html>
        `;

        try {
            const pdf = await RNHTMLtoPDF.convert({
                html: htmlContent,
                fileName: `inspection_${inspection.id}`,
                directory: 'Documents',
            });
            setPdfPath(pdf.filePath || null);
            setIsPdfModalVisible(true); // Show modal with PDF viewer
        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    };

    return (
        <TouchableOpacity style={styles.inspectionItem} onPress={() => onPress?.(inspection.id)}>
            <View style={styles.flexEnd}>
                <Button title="View PDF" onPress={createPDF} color={customColors.primary} />
            </View>

            <View style={styles.container}>
                <View style={styles.flexEnd}>
                    {inspection.inspectionStatusId ? <CheckedIcon /> : <DangerIcon />}
                </View>

                <View style={styles.flexContainer}>
                    <TextMain text="Name der Anlage: " isBold={true} />
                    <TextMain text={inspection.facilityName} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Ausftellungsort: " isBold={true} />
                    <TextMain text={inspection.location} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Anlage-Id: " isBold={true} />
                    <TextMain text={inspection.barcode} />
                </View>
                <View style={styles.flexContainer}>
                    <TextMain text="Nummer der Leistungsnachweis : " isBold={true} />
                    <TextMain text={inspection.contractNumber} />
                </View>
            </View>

            {/* Modal to display the PDF */}
            {pdfPath && (
                <Modal
                    visible={isPdfModalVisible}
                    animationType="slide"
                    onRequestClose={() => setIsPdfModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Button
                            title="Close PDF"
                            onPress={() => setIsPdfModalVisible(false)}
                            color={customColors.primary}
                        />
                        <PDF source={{ uri: `file://${pdfPath}` }} style={styles.pdfViewer} />
                    </View>
                </Modal>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
    },
    flexEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    inspectionItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: customColors.blueLighter,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    pdfViewer: {
        flex: 1,
        width: '100%',
    },
});

export default InspectionItem;
