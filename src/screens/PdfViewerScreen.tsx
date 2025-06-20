import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import JsreportPdfViewer from '../components/pdfview/JSReportView';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ReportData } from '../components/pdfview/helpers/types';
import { getInspectionByIdWithDetails } from '../../database/dataAccess/Query/sqlQueries';
import { REPORT_DATA } from '../components/pdfview/ReportData';

type PdfViewerScreenRouteProp = RouteProp<any, 'PdfViewerScreen'>;

const PdfViewerScreen = () => {
    const route = useRoute<PdfViewerScreenRouteProp>();
    const { inspectionId } = route.params;
    const [pdfReportData, setPdfReportData] = useState<ReportData | null>(null);

    useEffect(() => {
        const fetchInspection = async () => {
            const inspection = await getInspectionByIdWithDetails(inspectionId);
            if (!inspection) {
                setPdfReportData(REPORT_DATA);
                return;
            }

            const report: ReportData = {
                ...REPORT_DATA,
                company: {
                    name: 'AC-Inspektor GmbH',
                    address: 'Am Hardtwald 6',
                    city: '76275 Ettlingen',
                    phone: '+49 (0) 7243 3699 101',
                    email: 'kontakt@ac-inspektor.com',
                    inspectionTechnician: 'Luka Poljaković',
                },
                client: {
                    name: inspection.clientName,
                    address: `${inspection.clientAddress}, ${inspection.clientCity}`,
                    endClient: inspection.endClientName,
                    endClientAdress: `${inspection.endClientAddress}, ${inspection.endClientCity}`,
                    endClientSignature: inspection.endClientName,
                },
                device: {
                    location: inspection.location,
                    type: inspection.deviceTypeName,
                    airVolume: inspection.airVolume,
                    constructionYear: inspection.constructionYear,
                    lastMaintenance: inspection.lastMaintenance,
                    id: inspection.barcode,
                },
                inspection: {
                    type: inspection.inspectionTypeName,
                    date: inspection.inspectionDate,
                    next: inspection.nextInspectionDate,
                    images: [
                        {
                            imagePath:
                                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/images/industrial-ac',
                        },
                    ],
                    stateImages: [
                        {
                            title: 'ANLAGE',
                            imagePaths: [
                                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/images/industrial-ac',
                            ],
                        },
                    ],
                },
            };

            setPdfReportData(report);
        };

        fetchInspection();
    }, [inspectionId]);

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
