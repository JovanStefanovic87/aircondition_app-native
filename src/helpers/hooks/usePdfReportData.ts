// hooks/usePdfReportData.ts
import { useEffect, useState } from 'react';
import { ReportData } from '../../components/pdfview/helpers/types';
import {
    getInspectionByIdWithDetails,
    getInspectionDeviceStateForReport,
    getInspectionElementImagesByElementId,
    getInspectionElementsForReport,
    getInspectionElementStateDetails,
    getInspectionElementTitleGroupImagesByElementId,
    getInspectionImages,
    getInspectionStateImages,
} from '../../../database/dataAccess/Query/sqlQueries';
import { REPORT_DATA } from '../../components/pdfview/ReportData';
import {
    buildImagePathsWithS3Base,
    ElementResult,
    groupTypes,
    mergeElementsAndStates,
    parseNoteValue,
} from '../pdfHelpers';

export const usePdfReportData = (inspectionId: string) => {
    const [pdfReportData, setPdfReportData] = useState<ReportData | null>(null);

    useEffect(() => {
        const fetchInspection = async () => {
            const inspection = await getInspectionByIdWithDetails(inspectionId);
            const inspectionImages = await getInspectionImages(inspectionId);
            const inspectionStateImages = await getInspectionStateImages(inspectionId);

            const elements = await getInspectionElementsForReport(inspectionId);
            const titleComponentElementState: ElementResult[] = [];

            for (const el of elements) {
                const states = await getInspectionElementStateDetails(
                    inspectionId,
                    el.inspectionDeviceElementId,
                );

                const inspectionElementImages =
                    await getInspectionElementTitleGroupImagesByElementId(
                        el.inspectionDeviceElementId,
                    );

                const generalInspectionElementImages = await getInspectionElementImagesByElementId(
                    el.inspectionDeviceElementId,
                );

                const elementImagePaths = buildImagePathsWithS3Base(
                    inspectionElementImages,
                    generalInspectionElementImages,
                    true,
                );

                const mappedStates = states.map((state) => {
                    const { groupTypeName } = state;
                    let issues = [];

                    if (
                        groupTypeName === groupTypes.MIKROBIOLOGISCH ||
                        groupTypeName === groupTypes.LUFTKEIMZAHLMESSUNG
                    ) {
                        const note = state.titleComponents?.[0]?.deviceStateComponents?.[0]?.note;
                        const { value, valueText } = parseNoteValue(note ?? '', groupTypeName);

                        if (value !== null) {
                            issues.push({
                                title:
                                    groupTypeName === groupTypes.MIKROBIOLOGISCH
                                        ? 'Analyse'
                                        : 'Messung',
                                value,
                                valueText,
                                comment: null,
                            });
                        }
                    } else {
                        issues = state.titleComponents.flatMap((tc) =>
                            tc.deviceStateComponents
                                .filter((comp) => comp.value !== null && comp.value !== 1)
                                .map((comp) => ({
                                    title: tc.name ?? comp.name ?? '',
                                    value: comp.value,
                                    valueText: comp.name ?? null,
                                    comment: comp.note ?? null,
                                })),
                        );
                    }

                    return {
                        groupTypeName,
                        issues,
                    };
                });

                titleComponentElementState.push({
                    elementTitle: el.imageTitle,
                    elementSymbolImage: el.imageDataUri,
                    imagePaths: elementImagePaths,
                    state: mappedStates,
                });
            }

            const statesPerElement = await getInspectionDeviceStateForReport(inspectionId);
            const elementsWithState = mergeElementsAndStates(elements, statesPerElement);

            const report: ReportData = {
                created_on: inspection.createdAt,
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
                    images: buildImagePathsWithS3Base(inspectionImages),
                    stateImages: [
                        {
                            title: 'ANLAGE',
                            imagePaths: buildImagePathsWithS3Base(inspectionStateImages),
                        },
                    ],
                },
                elements: elementsWithState,
                elementState: titleComponentElementState,
            };

            setPdfReportData(report);
        };

        fetchInspection();
    }, [inspectionId]);

    return pdfReportData;
};
