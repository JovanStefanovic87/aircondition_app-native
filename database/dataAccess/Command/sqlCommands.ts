import { INSPECTION_TYPES } from '../../../src/helpers/constants';
import {
    DeviceElementImageInsert,
    DeviceElementSortUpdate,
    DeviceElementStateImageInsert,
    DeviceStateImageInsert,
    ImageStorage,
    ImageStorageInsert,
    InspectionDeviceComponent,
    InspectionDeviceElementUpdate,
    InspectionDeviceStateUpdate,
    InspectionImageInsert,
    InspectionQuestion,
    InspectionUpdate,
    QuestionComponent,
} from '../../types';
import {
    executeDeleteByConditions,
    executeDeleteById,
    executeInsert,
    executeInsertWithGuid,
    executeUpdate,
    executeUpdateArray,
    executeUpdateOrInsertWithGuid,
} from '../Command/baseCommand';
import {
    getComponentElementTitleIds,
    getDeviceStateComponentsWholeDevice,
    getInspectionDeviceElements,
    getInspectionDeviceStateByDeviceElements,
    getInspectionDeviceStateForElements,
    getQuestionComponents,
} from '../Query/sqlQueries';

/**
 * saveInspection - Function inserts or updates an inspection in step 1 and fills all needed device states for step 2, if inspection is new.
 * @param inspection - This object is saved in the Inspection table
 */

export const saveInspection = async (
    inspection: Partial<InspectionUpdate>,
): Promise<string | void> => {
    const newInspectionId = await executeUpdateOrInsertWithGuid<InspectionUpdate>(
        'Inspection',
        inspection,
    );

    if (newInspectionId) {
        await fillDeviceStateToInspection(newInspectionId);
        await fillQuestions(newInspectionId, inspection.inspectionTypeId);
    }

    return newInspectionId;
};

const fillDeviceStateToInspection = async (inspectonId: string): Promise<void> => {
    const deviceStateComponents = await getDeviceStateComponentsWholeDevice();

    for (const component of deviceStateComponents) {
        const record = {
            inspectionId: inspectonId,
            componentElementTitleId: component.id,
        };

        await executeUpdateOrInsertWithGuid<InspectionDeviceComponent>(
            'Inspection_DeviceState',
            record,
        );
    }
};

const fillQuestions = async (inspectionId: string, inspectionTypeId: number): Promise<void> => {
    let questions: QuestionComponent[] = [];

    // Handle mixed inspection type
    if (inspectionTypeId === INSPECTION_TYPES.INITIAL_AND_RISK) {
        const initialInspectionQuestions = await getQuestionComponents(
            INSPECTION_TYPES.INITIAL_INSPECTION,
        );
        const riskAssessmentQuestions = await getQuestionComponents(
            INSPECTION_TYPES.RISK_ASSESSMENT,
        );

        // Combine questions, avoiding duplicates if any
        const questionMap = new Map<number, QuestionComponent>();
        [...initialInspectionQuestions, ...riskAssessmentQuestions].forEach((question) =>
            questionMap.set(question.id, question),
        );
        questions = Array.from(questionMap.values());
    } else {
        // For all other types, fetch questions normally
        questions = await getQuestionComponents(inspectionTypeId);
    }

    // Insert questions into inspection
    for (const question of questions) {
        const record: InspectionQuestion = {
            inspectionId: inspectionId,
            questionId: question.id,
        };

        await executeUpdateOrInsertWithGuid<InspectionQuestion>('Inspection_Question', record);
    }
};

/**
 * saveInspectionDeviceState - Function that saves the state of the device in step 2
 * @param record - Insert into Inspection_DeviceState table
 */
export const saveInspectionDeviceState = async (
    record: InspectionDeviceStateUpdate,
): Promise<void> => {
    await executeUpdate<InspectionDeviceStateUpdate>('Inspection_DeviceState', record);
};

/**
 * saveInspectionImage - Function that saves an images of general condition for the Whole Device in step 2
 * @param inspectionId - Inspection table
 * @param record - Insert into ImageStorage table
 */
export const saveInspectionImage = async (
    inspectionId: string,
    record: ImageStorageInsert,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const inspectionImageRecord: InspectionImageInsert = {
        inspectionId: inspectionId,
        imageId: imageId,
    };

    await executeInsertWithGuid<InspectionImageInsert>('Inspection_Image', inspectionImageRecord);
};

/**
 * saveDeviceStateImage - Function that saves an images of device state in steps 2 and 4
 * @param titleId - TitleComponent table
 * @param groupTypeId - Physical, Constructive, Microbiological, Air germ measurement
 * @param record - Insert into ImageStorage table
 * @param deviceElementId - DeviceElement table
 */
export const saveDeviceStateImage = async (
    titleId: number,
    groupTypeId: number,
    record: ImageStorageInsert,
    deviceElementId?: number,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const imageRecord: DeviceStateImageInsert = {
        titleComponentId: titleId,
        groupTypeId: groupTypeId,
        deviceElementId: deviceElementId || null,
        imageId: imageId,
    };

    await executeInsert<DeviceStateImageInsert>('DeviceState_Title_Group_Image', imageRecord);
};

/**
 * saveDeviceElementImage - Function that saves an images of general state for device element in step 4
 * @param deviceElementId - DeviceElement table
 * @param record - Insert into ImageStorage table
 */
export const saveDeviceElementImage = async (
    deviceElementId: number,
    record: ImageStorageInsert,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const imageRecord: DeviceElementImageInsert = {
        deviceElementId: deviceElementId,
        imageId: imageId,
    };

    await executeInsert<DeviceStateImageInsert>('DeviceElement_Image', imageRecord);
};

/**
 * saveInspectionDeviceElement - Function that saves selected elements in step 3
 * @param record - Insert element selection into Inspection_DeviceElement table
 */
export const saveInspectionDeviceElement = async (
    record: InspectionDeviceElementUpdate,
): Promise<void> => {
    await executeUpdateOrInsertWithGuid<InspectionDeviceElementUpdate>(
        'Inspection_DeviceElement',
        record,
    );
};

/**
 * deleteInspectionDeviceElement - Function that deletes selected elements in step 3
 * @param inspectionDeviceElementId - Delete element from Inspection_DeviceElement table
 */
export const deleteInspectionDeviceElement = async (
    inspectionDeviceElementId: string,
): Promise<void> => {
    await executeDeleteById('Inspection_DeviceElement', inspectionDeviceElementId);
};

export const saveDeviceElementsSortOrder = async (
    records: DeviceElementSortUpdate[],
): Promise<void> => {
    await executeUpdateArray<DeviceElementSortUpdate[]>('Inspection_DeviceElement', records);
};

/**
 * Function that saves DeviceStateComponents (StateType => State of device element) linked to selected elements in step 3
 * Usage: Inspection Step 3 (element selection) when clicked on "Save" button
 * @param inspectionId - The ID of the inspection
 * @param elementsList - The list of element IDs to link to the DeviceStateComponents
 * @returns A promise that resolves when the DeviceStateComponents have been saved
 */

export const saveDeviceStatesByElementsToInspection = async (
    inspectonId: string,
): Promise<string | void> => {
    if (inspectonId) {
        await fillDeviceStateByElementsToInspection(inspectonId);
    }

    return inspectonId;
};

/**
 * fillDeviceStateByElementsToInspection - Is part of saveDeviceStatesByElementsToInspection Function
 * @param inspectionId
 */
const fillDeviceStateByElementsToInspection = async (inspectionId: string): Promise<void> => {
    const inspectionElements = await getInspectionDeviceElements(inspectionId);
    const inspectionElementIds = inspectionElements.map((element) => element.id);

    const existingInspectionDeviceStates = await getInspectionDeviceStateByDeviceElements(
        inspectionElementIds,
    );

    const existingInspectionElementIds = existingInspectionDeviceStates.map(
        (d) => d.inspectionDeviceElementId,
    );

    const devicesElementsToAdd = inspectionElements.filter(
        (e) => !existingInspectionElementIds.includes(e.id),
    );

    const devicesElementsToRemove = existingInspectionElementIds.filter(
        (id) => !inspectionElementIds.includes(id),
    );

    for (const device of devicesElementsToAdd) {
        const componentElementTitleIds = await getComponentElementTitleIds([
            device.deviceElementId,
        ]);

        for (const componentElementTitleId of componentElementTitleIds) {
            const record = {
                inspectionId: inspectionId,
                componentElementTitleId: componentElementTitleId,
                inspectionDeviceElementId: device.id,
            };

            await executeUpdateOrInsertWithGuid<InspectionDeviceComponent>(
                'Inspection_DeviceState',
                record,
            );
        }
    }

    for (const device of devicesElementsToRemove) {
        await executeDeleteByConditions('Inspection_DeviceState', {
            inspectionId,
            inspectionDeviceElementId: device,
        });
    }
};
