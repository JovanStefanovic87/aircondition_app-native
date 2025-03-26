import {
    getDeviceElementTypes,
    getInspectionDeviceElements,
} from '../../database/dataAccess/Query/sqlQueries';
import { InspectionDeviceElement } from '../../database/types';

export const fetchDeviceElementTypes = async (setDeviceElementTypes) => {
    try {
        const elementTypes = await getDeviceElementTypes();
        setDeviceElementTypes(elementTypes);
    } catch (error) {
        console.error('Error fetching device element types:', error);
    }
};

export const fetchInspectionDeviceElements = async (
    inspectionId: string,
    setInspectionDeviceElements: (elements: InspectionDeviceElement[]) => void,
) => {
    try {
        const elements = await getInspectionDeviceElements(inspectionId);
        setInspectionDeviceElements(elements);
    } catch (error) {
        console.error('Error fetching inspection device elements:', error);
    }
};
