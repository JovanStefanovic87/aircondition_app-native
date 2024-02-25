import {
    InspectionDeviceComponentUpdate,
    InspectionDeviceStateUpdate,
    InspectionUpdate,
} from '../../types';
import { executeUpdate, executeUpdateOrInsertWithGuid } from './baseQuery';
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
    await executeUpdate<InspectionDeviceStateUpdate>('Inspection_DeviceState', record);
};
