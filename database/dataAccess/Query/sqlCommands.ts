import {
    ImageStorage,
    ImageStorageInsert,
    InspectionDeviceComponentUpdate,
    InspectionDeviceStateUpdate,
    InspectionImageInsert,
    InspectionUpdate,
} from '../../types';
import { executeInsertWithGuid, executeUpdate, executeUpdateOrInsertWithGuid } from './baseQuery';
import { getDeviceStateComponents } from './sqlQueries';

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
    const deviceStateComponents = await getDeviceStateComponents();

    for (const component of deviceStateComponents) {
        const record = {
            inspectionId: inspectonId,
            deviceStateId: component.id,
        };

        await executeUpdateOrInsertWithGuid<InspectionDeviceComponentUpdate>(
            'Inspection_DeviceState',
            record,
        );
    }
};

export const saveInspectionDeviceState = async (
    record: InspectionDeviceStateUpdate,
): Promise<void> => {
    console.log('Data to be saved in saveInspectionDeviceState:', record);
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
