import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';
import base64 from 'react-native-base64';
import { ReportData } from './helpers/types';

type JsreportPdfViewerProps = {
    inspectionData?: ReportData;
};

const JsreportPdfViewer = ({ inspectionData }: JsreportPdfViewerProps) => {
    const [pdfPath, setPdfPath] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndSavePdf = async () => {
            try {
                const authHeader = 'Basic ' + base64.encode('ac-admin:svN4geZabMBN4h');

                const response = await fetch(
                    'https://ac-jsreport.gdent-komunikator.rs/api/report',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authHeader,
                        },
                        body: JSON.stringify({
                            template: { name: 'inspection-report' },
                            data: inspectionData,
                            options: { preview: false },
                        }),
                    },
                );

                if (!response.ok) throw new Error('Failed to fetch PDF');

                const blob = await response.blob();
                const reader = new FileReader();

                reader.onloadend = async () => {
                    const base64Data = (reader.result as string).split(',')[1];
                    const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/report.pdf`;
                    await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');
                    setPdfPath(filePath);
                };

                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('PDF fetch/save error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSavePdf();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
    if (!pdfPath) return <View style={styles.errorContainer} />;

    return <Pdf source={{ uri: `file://${pdfPath}` }} style={styles.pdf} trustAllCerts={true} />;
};

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default JsreportPdfViewer;
