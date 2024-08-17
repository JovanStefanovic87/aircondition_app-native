import {
    DeviceElementSortUpdate,
    ImageStorage,
    ImageStorageInsert,
    InspectionDeviceComponent,
    InspectionDeviceElementUpdate,
    InspectionDeviceStateUpdate,
    InspectionImageInsert,
    InspectionUpdate,
} from '../../types';
import {
    executeDeleteByConditions,
    executeDeleteById,
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
} from '../Query/sqlQueries';

export const saveInspection = async (
    inspecton: Partial<InspectionUpdate>,
): Promise<string | void> => {
    const newInspectionId = await executeUpdateOrInsertWithGuid<InspectionUpdate>(
        'Inspection',
        inspecton,
    );

    if (newInspectionId) {
        await fillDeviceStateToInspection(newInspectionId);
    }

    return newInspectionId;
};

const fillDeviceStateToInspection = async (inspectonId: string): Promise<void> => {
    const deviceStateComponents = await getDeviceStateComponentsWholeDevice();

    for (const component of deviceStateComponents) {
        const record = {
            inspectionId: inspectonId,
            componentElementTitleId: component.deviceStateComponentId,
        };

        await executeUpdateOrInsertWithGuid<InspectionDeviceComponent>(
            'Inspection_DeviceState',
            record,
        );
    }
};

export const saveInspectionDeviceState = async (
    record: InspectionDeviceStateUpdate,
): Promise<void> => {
    await executeUpdate<InspectionDeviceStateUpdate>('Inspection_DeviceState', record);
};

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

export const saveInspectionDeviceElement = async (
    record: InspectionDeviceElementUpdate,
): Promise<void> => {
    await executeUpdateOrInsertWithGuid<InspectionDeviceElementUpdate>(
        'Inspection_DeviceElement',
        record,
    );
};

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

const fillDeviceStateByElementsToInspection = async (inspectionId: string): Promise<void> => {
    const inspectionElements = await getInspectionDeviceElements(inspectionId);
    const inspectionElementIds = inspectionElements.map((element) => element.id);

    console.log('inspectionElementIds', inspectionElementIds);

    const existingInspectionDeviceStates = await getInspectionDeviceStateByDeviceElements(
        inspectionElementIds,
    );

    console.log('existingInspectionDeviceStates', existingInspectionDeviceStates);

    const existingInspectionElementIds = existingInspectionDeviceStates.map(
        (d) => d.inspectionDeviceElementId,
    );

    console.log('existingInspectionElementIds', existingInspectionElementIds);

    const devicesElementsToAdd = inspectionElements.filter(
        (e) => !existingInspectionElementIds.includes(e.id),
    );

    console.log('devicesElementsToAdd', devicesElementsToAdd);

    const devicesElementsToRemove = existingInspectionElementIds.filter(
        (id) => !inspectionElementIds.includes(id),
    );

    console.log('devicesElementsToRemove', devicesElementsToRemove);

    for (const device of devicesElementsToAdd) {
        const componentElementTitleIds = await getComponentElementTitleIds([
            device.deviceElementId,
        ]);

        console.log('componentElementTitleIds', componentElementTitleIds);

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
