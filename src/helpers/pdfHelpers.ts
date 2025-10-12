// utils/pdfHelpers.ts
import { getS3Url } from '../api/helpers/functions';
import { ImageStorage } from '../../database/types';
import { InspectionDeviceStatesForReport, InspectionElementsForReport } from '../../database/types';

export const groupTypes = {
    PHYSIKALISCH: 'PHYSIKALISCH',
    KONSTRUKTIV: 'KONSTRUKTIV',
    MIKROBIOLOGISCH: 'MIKROBIOLOGISCH',
    LUFTKEIMZAHLMESSUNG: 'LUFTKEIMZAHLMESSUNG',
};

export const parseNoteValue = (
    note: string,
    groupTypeName: string,
): { value: number | null; valueText: string | null } => {
    if (!note) return { value: null, valueText: null };

    const parts = note.split('-');

    if (groupTypeName === groupTypes.MIKROBIOLOGISCH) {
        if (parts.length < 2) return { value: null, valueText: null };
        const values = parts[1].split('/').map((v) => parseInt(v, 10));
        const sum = values.reduce((a, b) => a + b, 0);

        let value: number;
        if (sum <= 24) value = 1;
        else if (sum <= 49) value = 2;
        else if (sum <= 99) value = 3;
        else value = 4;

        return { value, valueText: parts[1] };
    }

    if (groupTypeName === groupTypes.LUFTKEIMZAHLMESSUNG) {
        if (parts.length < 3) return { value: null, valueText: null };

        const first = parts[1].split('/').map((v) => parseInt(v, 10));
        const second = parts[2].split('/').map((v) => parseInt(v, 10));
        if (first.length !== second.length) return { value: null, valueText: null };

        let result = 1;
        for (let i = 0; i < first.length; i++) {
            if (first[i] < second[i]) {
                result = 4;
                break;
            }
        }

        return { value: result, valueText: `${parts[1]}-${parts[2]}` };
    }

    return { value: null, valueText: null };
};

export const buildImagePathsWithS3Base = (
    inspectionImages: ImageStorage[],
    generalImages?: ImageStorage[],
): string[] => {
    const baseUrl = getS3Url();
    return [...inspectionImages, ...(generalImages || [])]
        .map((img) => img.storagePathS3)
        .filter((path): path is string => Boolean(path))
        .map((path) => baseUrl + path);
};

export type ElementResult = {
    elementTitle: string;
    elementSymbolImage: string;
    imagePaths: string[];
    state: {
        groupTypeName: string;
        issues: {
            title: string;
            value: number | null;
            valueText: string | null;
            comment: string | null;
        }[];
    }[];
};

export const mergeElementsAndStates = (
    elements: InspectionElementsForReport[],
    states: InspectionDeviceStatesForReport[],
) => {
    return elements.map((el) => {
        const relatedStates = states.filter(
            (s) => s.inspectionDeviceElementId === el.inspectionDeviceElementId,
        );

        const maxByGroup = (groupTypeId: number) => {
            const values = relatedStates
                .filter((s) => s.groupTypeId === groupTypeId)
                .map((s) => s.value)
                .filter((v): v is number => v !== null);
            return values.length ? Math.max(...values) : null;
        };

        const groupTypes = {
            Physicalisch: 1,
            Konstruktiv: 2,
            Mikrobiologisch: 3,
            Luftkeimzahlmessung: 4,
        };

        const measurementM = () => {
            const entry = relatedStates.find((s) => s.groupTypeId === groupTypes.Mikrobiologisch);
            if (!entry?.note) return null;
            const parts = entry.note.split('-');
            if (parts.length < 2) return null;
            const values = parts[1].split('/').map((v) => parseInt(v, 10));
            const sum = values.reduce((a, b) => a + b, 0);
            if (sum <= 24) return 1;
            if (sum <= 49) return 2;
            if (sum <= 99) return 3;
            return 4;
        };

        const measurementL = () => {
            const entry = relatedStates.find(
                (s) => s.groupTypeId === groupTypes.Luftkeimzahlmessung,
            );
            if (!entry?.note) return null;
            const parts = entry.note.split('-');
            if (parts.length < 3) return null;
            const first = parts[1].split('/').map((v) => parseInt(v, 10));
            const second = parts[2].split('/').map((v) => parseInt(v, 10));
            if (first.length !== second.length) return null;

            let result = 1;
            for (let i = 0; i < first.length; i++) {
                if (first[i] < second[i]) {
                    result = 4;
                    break;
                }
            }
            return result;
        };

        return {
            imageId: el.inspectionDeviceElementId,
            imageTitle: el.imageTitle,
            imageDataUri: el.imageDataUri,
            elementPositionId: el.elementPositionId,
            elementValues: {
                p: maxByGroup(groupTypes.Physicalisch),
                k: maxByGroup(groupTypes.Konstruktiv),
                m: measurementM(),
                l: measurementL(),
            },
        };
    });
};
