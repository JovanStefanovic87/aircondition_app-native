// hooks/usePdfReportData.ts
import { useEffect, useState } from 'react';
import { ReportData } from '../../components/pdfview/helpers/types';
import {
    getInspectionByIdWithDetails,
    getInspectionDeviceStateByGroupType,
    getInspectionDeviceStateForReport,
    getInspectionElementImagesByElementId,
    getInspectionElementsForReport,
    getInspectionElementStateDetails,
    getInspectionElementTitleGroupImagesByElementId,
    getInspectionImages,
    getInspectionQuestionImagesForReport,
    getInspectionQuestions,
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
            const inspectionGeneralState = await getInspectionDeviceStateByGroupType(inspectionId);

            const mappedState = Object.values(
                inspectionGeneralState.reduce((acc, item) => {
                    if (!item.value || item.value === 1) return acc;
                    if (!acc[item.groupTypeName]) {
                        acc[item.groupTypeName] = {
                            groupTypeName: item.groupTypeName,
                            issues: [],
                        };
                    }

                    acc[item.groupTypeName].issues.push({
                        title: item.titleComponentName,
                        value: item.value,
                        valueText: item.name,
                        comment: item.note,
                    });

                    return acc;
                }, {} as Record<string, { groupTypeName: string; issues: any[] }>),
            );
            const inspectionData = {
                type: inspection.inspectionTypeName,
                date: inspection.inspectionDate,
                next: inspection.nextInspectionDate,
                images: buildImagePathsWithS3Base(inspectionImages),
                imagePaths: buildImagePathsWithS3Base(inspectionStateImages),
                state: mappedState,
            };

            const elements = await getInspectionElementsForReport(inspectionId);
            console.log('Fetched Elements:', JSON.stringify(elements));

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

            const questionsData = await getInspectionQuestions(inspectionId);
            const questionImageRows = await getInspectionQuestionImagesForReport(inspectionId);

            const imageByQuestion: Record<string, string> = {};
            for (const row of questionImageRows) {
                if (!imageByQuestion[row.inspectionQuestionId]) {
                    imageByQuestion[row.inspectionQuestionId] = row.storagePathS3;
                }
            }

            const answerIdToText: Record<number, string> = {
                1: 'Ja',
                2: 'Nein',
                3: 'Nicht relevant',
            };

            const checklists = questionsData.map((typeData) => ({
                title: typeData.inspectionTypeName,
                sections: typeData.questionsByGroup.map((group, groupIndex) => ({
                    number: groupIndex + 1,
                    title: group.name,
                    reference: group.groupReference,
                    questions: group.questions.map((q, qIndex) => {
                        const entry: {
                            id: string;
                            text: string;
                            answer: string;
                            comment?: string;
                            image?: string;
                        } = {
                            id: `${groupIndex + 1}.${qIndex + 1}`,
                            text: q.fullDescription,
                            answer: answerIdToText[q.answerId] ?? '',
                        };
                        if (q.comment) entry.comment = q.comment;
                        const img = imageByQuestion[q.inspectionQuestionId];
                        if (img) entry.image = img;
                        return entry;
                    }),
                })),
            }));

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
                inspection: inspectionData,
                elements: elementsWithState,
                elementState: titleComponentElementState,
                checklists,
            };

            setPdfReportData(report);
        };

        fetchInspection();
    }, [inspectionId]);

    return pdfReportData;
};
