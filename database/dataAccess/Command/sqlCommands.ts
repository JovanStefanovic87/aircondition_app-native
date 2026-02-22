//AC_INSPECTOR\database\dataAccess\Command\sqlCommands.ts
import { Alert } from 'react-native';
import { uploadImagesToCloudS3 } from '../../../src/api/s3ImageUpload';
import { INSPECTION_TYPES } from '../../../src/helpers/constants';
import { deleteFile } from '../../../src/helpers/universalFunctions';

import {
    ClientUpdate,
    DeviceElementSortUpdate,
    DeviceStateImageInsert,
    ImageStorage,
    ImageStorageInsert,
    InspectionDeviceComponent,
    InspectionDeviceElementImageInsert,
    InspectionDeviceElementUpdate,
    InspectionDeviceStateUpdate,
    InspectionImageInsert,
    InspectionQuestion,
    InspectionQuestionInsert,
    InspectionQuestionUpdate,
    InspectionTitleGroupImageInsert,
    InspectionUpdate,
    QuestionComponent,
    UploadResponse,
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
    getClientById,
    getComponentElementTitleIds,
    getDeviceStateComponentsWholeDevice,
    getImageStorageById,
    getInspectionById,
    getInspectionDeviceElements,
    getInspectionDeviceElementsBase,
    getInspectionDeviceStateByDeviceElements,
    getInspectionImages,
    getQuestionComponents,
    getInspectionQuestionImages,
    getAllInspectionImages,
} from '../Query/sqlQueries';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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

/**
 * updateInspectionStatus - Function that updates only the inspection status in the Inspection table
 * @param inspectionId - Id of inspection
 * @param inspectionStatusId - New status id
 */
export const updateInspectionStatus = async (
    inspectionId: string,
    inspectionStatusId: number,
): Promise<void> => {
    const inspection = await getInspectionById(inspectionId);
    if (!inspection) throw new Error('Inspection not found');

    const record: InspectionUpdate = {
        ...inspection,
        inspectionStatusId: inspectionStatusId,
    };
    await executeUpdate<InspectionUpdate>('Inspection', record);
};

/**
 * deleteInspection - Function will not actualy delete inspection from db, instead this will just update isDeleted=true state
 * @param inspectionId - Inspection table
 */
export const deleteInspection = async (inspectionId: string): Promise<void> => {
    const inspection = await getInspectionById(inspectionId);
    if (inspection) {
        inspection.isDeleted = true;
        await executeUpdateOrInsertWithGuid<InspectionUpdate>('Inspection', inspection);
    }
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
 * saveInspectionElementTitleGroupImage - Function that saves an images of element title group in STEP 4
 * @param titleId - TitleComponent table
 * @param groupTypeId - Physical, Constructive, Microbiological, Air germ measurement
 * @param record - Insert into ImageStorage table
 * @param deviceElementId - DeviceElement table
 */
export const saveInspectionElementTitleGroupImage = async (
    inspectionDeviceElementId: string,
    titleId: number,
    groupTypeId: number,
    record: ImageStorageInsert,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const imageRecord: DeviceStateImageInsert = {
        inspectionDeviceElementId: inspectionDeviceElementId,
        titleComponentId: titleId,
        groupTypeId: groupTypeId,
        imageId: imageId,
    };

    await executeInsert<DeviceStateImageInsert>(
        'Inspection_Element_Title_Group_Image',
        imageRecord,
    );
};

/**
 * saveDeviceStateImage - Function that saves an images of device state in STEP 2
 * @param inspectionId - Id of inspection
 * @param titleId - TitleComponent table
 * @param groupTypeId - Physical, Constructive, Microbiological, Air germ measurement
 * @param record - Insert into ImageStorage table
 */
export const saveInspectionTitleGroupImage = async (
    inspectionId: string,
    titleId: number,
    groupTypeId: number,
    record: ImageStorageInsert,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const imageRecord: InspectionTitleGroupImageInsert = {
        inspectionId: inspectionId,
        titleComponentId: titleId,
        groupTypeId: groupTypeId,
        imageId: imageId,
    };

    await executeInsert<InspectionTitleGroupImageInsert>(
        'Inspection_Title_Group_Image',
        imageRecord,
    );
};

/**
 * saveDeviceElementImage - Function that saves an images elements that are displayed in Step 3 - NOTE: UI feature not implemented yet
 * @param deviceElementId - DeviceElement table
 * @param record - Insert into ImageStorage table
 */
export const saveDeviceElementImage = async (
    inspectionDeviceElementId: string,
    record: ImageStorageInsert,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const imageRecord: InspectionDeviceElementImageInsert = {
        inspectionDeviceElementId: inspectionDeviceElementId,
        imageId: imageId,
    };

    await executeInsert<InspectionDeviceElementImageInsert>('DeviceElement_Image', imageRecord);
};

/**
 * saveDeviceElementImage - Function that saves an images of general state for device element in step 4
 * @param InspectionDeviceElementId - Inspection_DeviceElement table
 * @param record - Insert into ImageStorage table
 */
export const saveInspectionDeviceElementImage = async (
    inspectionDeviceElementId: string,
    record: ImageStorageInsert,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const imageRecord: InspectionDeviceElementImageInsert = {
        inspectionDeviceElementId: inspectionDeviceElementId,
        imageId: imageId,
    };

    await executeInsert<InspectionDeviceElementImageInsert>(
        'Inspection_Element_Image',
        imageRecord,
    );
};

/**
 * saveQuestionImage - Function that saves an images of question in step 5 and 6
 * @param inspectionQuestionId - Id of record in Inspection_Question table
 * @param record - Insert into ImageStorage table
 */
export const saveQuestionImage = async (
    inspectionQuestionId: string,
    record: ImageStorageInsert,
): Promise<void> => {
    const imageId = await executeInsertWithGuid<ImageStorage>('ImageStorage', record);

    if (!imageId) throw new Error('Error inserting image');

    const inspectionQuestionImageRecord: InspectionQuestionInsert = {
        inspectionQuestionId: inspectionQuestionId,
        imageId: imageId,
    };

    await executeInsertWithGuid<InspectionQuestionInsert>(
        'InspectionQuestion_Image',
        inspectionQuestionImageRecord,
    );
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

/**
 * saveInspectionQuestion - Function that saves the question answer in step 5 and 6
 * @param record - Question record
 */
export const saveInspectionQuestion = async (record: InspectionQuestionUpdate): Promise<void> => {
    console.log('record', record);
    await executeUpdate<InspectionQuestionUpdate>('Inspection_Question', record);
};

/**
 * deleteImage - Function that deletes image by Id and table name
 * @param imageId - ImageStorage table
 */
export const deleteImage = async (imageId: string, tableName: string): Promise<void> => {
    if (!imageId) {
        console.log('Image ID is missing. Image Not deleted');
        return;
    }
    const image = await getImageStorageById(imageId);

    deleteFile(image?.storagePath || '');
    console.log(
        `Deleted image with ID ${imageId} from table ${tableName} and removed file from storage`,
    );

    await executeUpdate('ImageStorage', { id: imageId, isDeleted: 1 });
};

/**
 * deleteInspectionImage - Function that deletes selected image of general overall device in step 2
 * @param imageId - ImageStorage table
 */
export const deleteInspectionImage = async (imageId: string): Promise<void> => {
    await deleteImage(imageId, 'Inspection_Image');
};

/**
 * deleteDeviceStateImage - Function that deletes selected image in step 2 and 4 of device state
 * @param imageId - ImageStorage table
 */
export const deleteDeviceStateImage = async (imageId: string): Promise<void> => {
    await deleteImage(imageId, 'Inspection_Element_Title_Group_Image');
};

/**
 * deleteDeviceElementImage - Function that deletes element.. images used in step 3
 * @param imageId - ImageStorage table
 */
export const deleteDeviceElementImage = async (imageId: string): Promise<void> => {
    await deleteImage(imageId, 'DeviceElement_Image');
};

/**
 * deleteInspectionElementImage - Function that deletes selected image in step 4 of element images
 * @param imageId - ImageStorage table
 */
export const deleteInspectionElementImage = async (imageId: string): Promise<void> => {
    await deleteImage(imageId, 'Inspection_Element_Image');
};

/**
 * uploadImagesToS3 - Function that uploads images to S3 and returns the response from the server
 * @param imageUris - Array of image URIs to be uploaded
 * @param inspectionId - The ID of the inspection
 * @param imageIds - Array of image IDs corresponding to the image URIs
 * @returns The response from the server after uploading the images
 */
export const uploadAllInspectionImagesToS3 = async (inspectionId: string): Promise<any> => {
    try {
        const allImageIds: string[] = [];
        const inspectionImages = await getInspectionImages(inspectionId);
        inspectionImages.forEach((img) => {
            allImageIds.push(img.id);
        });
        const inspectionQuestionImages = await getInspectionQuestionImages(inspectionId);
        inspectionQuestionImages.forEach((img) => {
            allImageIds.push(img.id);
        });
    } catch (error) {
        console.error('Error during image upload:', error);
        throw error;
    }
};

/**
 * saveClient - Function used in step 1 to save the client
 * @param record - Insert client information into Client table
 */
export const saveClient = async (record: ClientUpdate): Promise<void> => {
    await executeUpdateOrInsertWithGuid<ClientUpdate>('Client', record);
};

/**
 * deleteClient - Function will not actualy delete client from db, instead this will just update isDeleted=true state
 * @param clientId - Client table
 */
export const deleteClient = async (clientId: string): Promise<void> => {
    const client = await getClientById(clientId);
    if (client) {
        client.isDeleted = true;
        await executeUpdateOrInsertWithGuid<ClientUpdate>('Client', client);
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    await executeDeleteById('User', userId);
};

export const copyInspection = async (inspectionId: string): Promise<string | void> => {
    const inspectionToCopy = await getInspectionById(inspectionId);
    const inspectionElementsToCopy = await getInspectionDeviceElementsBase(inspectionId);
    if (!inspectionToCopy) return;

    // copy inspection data
    inspectionToCopy.facilityName = `Kopie von ${inspectionToCopy.facilityName}`;
    inspectionToCopy.inspectionStatusId = 1; // set status to "started"
    const { id: _, ...newInspection } = inspectionToCopy;
    const newInspectionId = await saveInspection(newInspection);

    if (!newInspectionId) return;

    // copy inspection elements
    for (const element of inspectionElementsToCopy) {
        const { id: _, inspectionId: __, ...rest } = element;
        await saveInspectionDeviceElement({
            ...rest,
            inspectionId: newInspectionId,
        });
    }

    return newInspectionId;
};
