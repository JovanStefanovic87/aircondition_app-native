// screens/PdfViewerScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Platform, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import RNFetchBlob from 'react-native-blob-util';
import JsreportPdfViewer from '../components/pdfview/JSReportView';
import { usePdfReportData } from '../helpers/hooks/usePdfReportData';

type PdfViewerScreenRouteProp = RouteProp<any, 'PdfViewerScreen'>;

const PdfViewerScreen = () => {
    const route = useRoute<PdfViewerScreenRouteProp>();
    const { inspectionId } = route.params;
    const pdfReportData = usePdfReportData(inspectionId);
    const [pdfPath, setPdfPath] = useState<string | null>(null);

    const saveToDownloads = async () => {
        if (!pdfPath) return;
        try {
            const destPath = `${RNFetchBlob.fs.dirs.DownloadDir}/inspection_report_${inspectionId}.pdf`;
            await RNFetchBlob.fs.cp(pdfPath, destPath);
            if (Platform.OS === 'android') {
                await RNFetchBlob.android.addCompleteDownload({
                    title: 'Inspection Report',
                    description: 'PDF-Bericht wurde in Downloads gespeichert.',
                    mime: 'application/pdf',
                    path: destPath,
                    showNotification: true,
                });
            }
            Alert.alert('Gespeichert', 'PDF wurde im Downloads-Ordner gespeichert.');
        } catch (error) {
            console.error('Save to downloads error:', error);
            Alert.alert('Fehler', 'PDF konnte nicht gespeichert werden.');
        }
    };

    if (!pdfReportData) return null;

    return (
        <SafeAreaView style={styles.container}>
            <JsreportPdfViewer inspectionData={pdfReportData} onPdfReady={setPdfPath} />
            {pdfPath && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={saveToDownloads}>
                        <Text style={styles.saveButtonText}>PDF speichern</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    buttonContainer: {
        position: 'absolute',
        bottom: 24,
        right: 24,
    },
    saveButton: {
        backgroundColor: '#1E6FBA',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
});

export default PdfViewerScreen;
