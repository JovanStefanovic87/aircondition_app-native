// screens/PdfViewerScreen.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import JsreportPdfViewer from '../components/pdfview/JSReportView';
import { usePdfReportData } from '../helpers/hooks/usePdfReportData';

type PdfViewerScreenRouteProp = RouteProp<any, 'PdfViewerScreen'>;

const PdfViewerScreen = () => {
    const route = useRoute<PdfViewerScreenRouteProp>();
    const { inspectionId } = route.params;
    const pdfReportData = usePdfReportData(inspectionId);

    if (!pdfReportData) return null;

    return (
        <SafeAreaView style={styles.container}>
            <JsreportPdfViewer inspectionData={pdfReportData} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default PdfViewerScreen;
