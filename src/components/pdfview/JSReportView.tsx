import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';
import base64 from 'react-native-base64';
import { ReportData } from './helpers/types';
import { useInspectionStore } from '../../store/store';

type JsreportPdfViewerProps = {
    inspectionData?: ReportData;
    onPdfReady?: (path: string) => void;
};

const JsreportPdfViewer = ({ inspectionData, onPdfReady }: JsreportPdfViewerProps) => {
    const { setIsLoading, setLoadingText, setError } = useInspectionStore();
    const [pdfPath, setPdfPath] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndSavePdf = async () => {
            try {
                setIsLoading(true);
                setLoadingText('PDF-Bericht wird generiert...');

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
                console.log('JSREPORT STATUS:', response.status);
                console.log('JSREPORT HEADERS:', JSON.stringify([...response.headers.entries()]));

                const contentType = response.headers.get('content-type');
                console.log('JSREPORT CONTENT-TYPE:', contentType);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('JSREPORT ERROR BODY:', errorText);
                    throw new Error('Fehler beim Generieren des PDF-Berichts');
                }

                if (!contentType || !contentType.includes('application/pdf')) {
                    const text = await response.text();
                    console.error('JSREPORT DID NOT RETURN PDF');
                    console.error('BODY:', text);
                    throw new Error('Response is not PDF');
                }

                const blob = await response.blob();
                const reader = new FileReader();

                reader.onloadend = async () => {
                    const base64Data = (reader.result as string).split(',')[1];
                    const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/report.pdf`;
                    await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');
                    setPdfPath(filePath);
                    onPdfReady?.(filePath);
                };

                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('PDF fetch/save error:', error);
                setError('Fehler beim Generieren des PDF-Berichts.');
            } finally {
                setIsLoading(false);
                setLoadingText(null);
            }
        };

        fetchAndSavePdf();
    }, []);

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
