import { InspectionDeviceComponentUpdate, InspectionUpdate } from "../../types";
import { executeUpdateOrInsertWithGuid } from "./baseQuery";
import { getDeviceStateComponents } from "./sqlQueries";


export const saveInspection = async (inspecton: Partial<InspectionUpdate>): Promise<void> => {
    const newInspectionId = await executeUpdateOrInsertWithGuid<InspectionUpdate>('Inspection', inspecton);

    if (newInspectionId) {
        await fillDeviceStateToInspection(newInspectionId);
    }
};

const fillDeviceStateToInspection = async (inspectonId: string): Promise<void> => {
    const deviceStateComponents = await getDeviceStateComponents();
    console.log('deviceStateComponents', deviceStateComponents)
    for (const component of deviceStateComponents) {
        const record = {
            inspectionId: inspectonId,
            deviceStateId: component.id
        };

        await executeUpdateOrInsertWithGuid<InspectionDeviceComponentUpdate>('Inspection_DeviceState', record);
    }
};



export const mockInspection: Partial<InspectionUpdate> = {
    barcode: 'ABC123',
    deviceTypeId: 1,
    inspectionTypeId: 1,
    facilityName: 'Sample Facility',
    location: 'Sample Location',
    contractNumber: '12345',
    createdAt: '2024-02-13T12:00:00Z',
    airVolume: 100,
    userId: 'c1480367-7de5-4275-aa33-dde1db51c45e',
};