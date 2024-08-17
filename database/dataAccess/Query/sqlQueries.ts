import { STATE_TYPES } from '../../../src/helpers/constants';
import {
    ComponentElementTitle,
    DatabaseVersionType,
    DeviceElement,
    DeviceElementPosition,
    DeviceElementType,
    DeviceStateByInspection,
    DeviceStateComponent,
    DeviceStateComponentsForInspection,
    DeviceStateValueDetails,
    DeviceType,
    ImageStorage,
    Inspection,
    InspectionAndImageStorage,
    InspectionDeviceComponent,
    InspectionDeviceElement,
    InspectionStatus,
    InspectionType,
    InspectionUpdate,
    TitleComponent,
    User,
} from '../../types';
import { executeQuery, executeQuerySingle } from './baseQuery';

export const getDBVersionTable = async (): Promise<DatabaseVersionType[]> => {
    const query = `SELECT * FROM DatabaseVersion`;
    return executeQuery<DatabaseVersionType>({ query });
};

export const getDeviceTypes = async (): Promise<DeviceType[]> => {
    const query = `SELECT * FROM DeviceType`;
    return executeQuery<DeviceType>({ query });
};

export const getInspectionTypes = async (): Promise<InspectionType[]> => {
    const query = `SELECT * FROM InspectionType`;
    return executeQuery<InspectionType>({ query });
};

export const getInspectionStatus = async (): Promise<InspectionStatus[]> => {
    const query = `SELECT * FROM InspectionStatus`;
    return executeQuery<InspectionStatus>({ query });
};

export const getUser = async (): Promise<User[]> => {
    const query = `SELECT id, name, roleId, userName FROM User WHERE userName = 'darko' AND password = 'hashed_password'`;
    return executeQuery<User>({ query });
};

export const getInspections = async (): Promise<Inspection[]> => {
    const query = `SELECT * FROM Inspection`;
    return executeQuery<Inspection>({ query });
};

export const getInspectionById = async (inspectionId: string): Promise<InspectionUpdate> => {
    const query = `SELECT * FROM Inspection where id = '${inspectionId}'`;
    return executeQuerySingle<InspectionUpdate>({ query });
};

export const getInspectionDeviceStateForElements = async (
    inspectionId: string,
): Promise<InspectionDeviceComponent[]> => {
    const query = `
        SELECT ids.* FROM Component_Element_Title cet
        LEFT JOIN DeviceStateComponent dsc ON dsc.id = cet.deviceStateComponentId
        LEFT JOIN Inspection_DeviceState ids ON ids.componentElementTitleId = cet.id
        WHERE dsc.stateTypeId=${STATE_TYPES.DEVICE_ELEMENT} AND ids.inspectionId = '${inspectionId}'`;

    return executeQuery<InspectionDeviceComponent>({ query });
};

export const getAllInspectionDeviceStates = async (): Promise<InspectionDeviceComponent[]> => {
    const query = `
        SELECT * FROM Inspection_DeviceState`;
    return executeQuery<InspectionDeviceComponent>({ query });
};

export const getDeviceStateComponentsWholeDevice = async (): Promise<ComponentElementTitle[]> => {
    const query = `
        SELECT cet.* FROM Component_Element_Title cet
        LEFT JOIN DeviceStateComponent dsc ON dsc.id = cet.deviceStateComponentId
        WHERE dsc.stateTypeId=${STATE_TYPES.WHOLE_DEVICE}`;
    return executeQuery<ComponentElementTitle>({ query });
};

export const getDeviceStateComponentsElementDevice = async (): Promise<DeviceStateComponent[]> => {
    const query = `SELECT * FROM DeviceStateComponent where stateTypeId=${STATE_TYPES.DEVICE_ELEMENT}`;
    return executeQuery<DeviceStateComponent>({ query });
};

export const getComponentElementTitleIds = async (elementsList: number[]): Promise<number[]> => {
    const query = `
        SELECT cet.id 
        FROM Component_Element_Title cet
        LEFT JOIN DeviceStateComponent dsc ON dsc.id = cet.deviceStateComponentId
        WHERE dsc.stateTypeId = ${STATE_TYPES.DEVICE_ELEMENT} 
        AND cet.deviceElementId IN (${elementsList.join(',')})
    `;
    const result = await executeQuery<{ id: number }>({ query });
    return result.map((row) => row.id);
};

export const getElementStateComponents = async (): Promise<DeviceStateComponent[]> => {
    const query = `SELECT * FROM DeviceStateComponent WHERE elementId IS NOT NULL`;
    return executeQuery<DeviceStateComponent>({ query });
};

export const getInspectionDeviceState = async (): Promise<InspectionDeviceComponent[]> => {
    const query = `SELECT * FROM Inspection_DeviceState`;
    return executeQuery<InspectionDeviceComponent>({ query });
};

export const getInspectionDeviceStateByGroupType = async (
    inspectionId: string,
): Promise<DeviceStateByInspection[]> => {
    const query = `
        SELECT
            dsc.id, ids.inspectionId, cet.deviceStateComponentId as deviceStateId, ids.id as inspectionDeviceStateId,
            ids.value, ids.note, dsc.name, dsc.groupTypeId, gt.name as groupTypeName, cet.titleComponentId, cet.isUsingNote, 
            cet.displayOrder,  tc.name as titleComponentName, cet.id as componentElementTitleId
            
            FROM Component_Element_Title cet
            
            LEFT JOIN DeviceStateComponent dsc ON dsc.id = cet.deviceStateComponentId
            LEFT JOIN GroupType gt ON gt.id=dsc.groupTypeId
            LEFT JOIN TitleComponent tc ON tc.id = cet.titleComponentId
            LEFT JOIN Inspection_DeviceState ids ON ids.componentElementTitleId = cet.id
        
        WHERE ids.inspectionId='${inspectionId}' and dsc.stateTypeId = ${STATE_TYPES.WHOLE_DEVICE}
        ORDER BY displayOrder
    `;
    return executeQuery<DeviceStateByInspection>({ query });
};

export const getDeviceStateValues = async (): Promise<DeviceStateValueDetails[]> => {
    const query = `
        SELECT dsv.*, sv.* from Device_StateValue dsv
        JOIN StateValue sv on sv.id = dsv.stateValueId
    `;
    return executeQuery<DeviceStateValueDetails>({ query });
};

export const getInspectionDeviceStateDetails = async (
    inspectionId: string,
): Promise<DeviceStateComponentsForInspection[]> => {
    const inspectionDeviceStateByGroupType = await getInspectionDeviceStateByGroupType(
        inspectionId,
    );

    const deviceStateValues = await getDeviceStateValues();

    const uniqueGroupTypeNames = [
        ...new Set(inspectionDeviceStateByGroupType.map((item) => item.groupTypeName)),
    ];
    const finalResult: DeviceStateComponentsForInspection[] = [];

    for (const groupTypeName of uniqueGroupTypeNames) {
        const groupTypeItems = inspectionDeviceStateByGroupType.filter(
            (item) => item.groupTypeName === groupTypeName,
        );
        const titleNames = [...new Set(groupTypeItems.map((item) => item.titleComponentName))];
        const titleComponents: TitleComponent[] = [];

        for (const title of titleNames) {
            const titleItems = groupTypeItems.filter((item) => item.titleComponentName === title);

            const titleComponent = {
                name: title,
                deviceStateComponents: titleItems
                    .filter((titleItem) => titleItem.titleComponentName === title)
                    .map((titleItem) => {
                        const deviceStateComponent = {
                            id: titleItem.id,
                            name: titleItem.name,
                            groupTypeId: titleItem.groupTypeId,
                            titleComponentId: titleItem.titleComponentId,
                            inspectionDeviceStateId: titleItem.inspectionDeviceStateId,
                            value: titleItem.value,
                            note: titleItem.note,
                            isUsingNote: titleItem.isUsingNote,
                            displayOrder: titleItem.displayOrder,
                            deviceStateValues: deviceStateValues.filter(
                                (value) =>
                                    value.componentElementTitleId ===
                                    titleItem.componentElementTitleId,
                            ),
                        };
                        return deviceStateComponent;
                    }),
            };
            titleComponents.push(titleComponent);
        }

        finalResult.push({ groupTypeName, titleComponents });
    }

    return finalResult;
};

export const getAllImageStorages = async (): Promise<ImageStorage[]> => {
    const query = `SELECT * FROM ImageStorage`;
    return executeQuery<ImageStorage>({ query });
};

export const getImageStorageByInspectionId = async (
    inspectionId: string,
): Promise<InspectionAndImageStorage[]> => {
    const query = `
        SELECT i.id, i.inspectionId, i.imageId, s.name, s.storagePath FROM Inspection_Image i
        LEFT JOIN ImageStorage s on s.id = i.imageId WHERE i.inspectionId = '${inspectionId}'`;
    return executeQuery<InspectionAndImageStorage>({ query });
};

export const getDeviceElements = async (): Promise<DeviceElement[]> => {
    const query = `SELECT * FROM DeviceElement`;
    return executeQuery<DeviceElement>({ query });
};

export const getDeviceElementTypes = async (): Promise<DeviceElementType[]> => {
    const query = `SELECT * FROM DeviceElementType`;
    return executeQuery<DeviceElementType>({ query });
};

export const getInspectionDeviceElements = async (
    inspectionId: string,
): Promise<InspectionDeviceElement[]> => {
    const query = `
        SELECT ide.*, de.imageFileName, de.imagePath, de.deviceElementTypeId FROM Inspection_DeviceElement ide
        LEFT JOIN DeviceElement de ON de.id = ide.deviceElementId
        WHERE ide.inspectionId = '${inspectionId}'`;
    return executeQuery<InspectionDeviceElement>({ query });
};

export const getDeviceElementPositions = async (): Promise<DeviceElementPosition[]> => {
    const query = `SELECT * FROM DeviceElementPosition`;
    return executeQuery<DeviceElementPosition>({ query });
};

export const getInspectionElementStateByGroupType = async (
    inspectionId: string,
    inspectionElementId: string,
): Promise<DeviceStateByInspection[]> => {
    const query = `
        SELECT
            dsc.id, ids.inspectionId, cet.deviceStateComponentId as deviceStateId, ids.id as inspectionDeviceStateId, cet.deviceElementId,
            ids.value, ids.note, dsc.name, dsc.groupTypeId, gt.name as groupTypeName, cet.titleComponentId, cet.isUsingNote, 
            cet.displayOrder,  tc.name as titleComponentName, cet.id as componentElementTitleId
            
            FROM Component_Element_Title cet
            
            LEFT JOIN DeviceStateComponent dsc ON dsc.id = cet.deviceStateComponentId
            LEFT JOIN GroupType gt ON gt.id=dsc.groupTypeId
            LEFT JOIN TitleComponent tc ON tc.id = cet.titleComponentId
            LEFT JOIN Inspection_DeviceState ids ON ids.componentElementTitleId = cet.id
        
        WHERE 
            ids.inspectionId='${inspectionId}' AND dsc.stateTypeId = ${STATE_TYPES.DEVICE_ELEMENT} AND ids.inspectionDeviceElementId = '${inspectionElementId}'
        ORDER BY displayOrder
    `;
    return executeQuery<DeviceStateByInspection>({ query });
};

export const getInspectionElementStateDetails = async (
    inspectionId: string,
    inspectionElementId: string,
): Promise<DeviceStateComponentsForInspection[]> => {
    const inspectionDeviceStateByGroupType = await getInspectionElementStateByGroupType(
        inspectionId,
        inspectionElementId,
    );

    const deviceStateValues = await getDeviceStateValues();

    const uniqueGroupTypeNames = [
        ...new Set(inspectionDeviceStateByGroupType.map((item) => item.groupTypeName)),
    ];
    const finalResult: DeviceStateComponentsForInspection[] = [];

    for (const groupTypeName of uniqueGroupTypeNames) {
        const groupTypeItems = inspectionDeviceStateByGroupType.filter(
            (item) => item.groupTypeName === groupTypeName,
        );
        const titleNames = [...new Set(groupTypeItems.map((item) => item.titleComponentName))];
        const titleComponents: TitleComponent[] = [];

        for (const title of titleNames) {
            const titleItems = groupTypeItems.filter((item) => item.titleComponentName === title);

            const titleComponent = {
                name: title,
                deviceStateComponents: titleItems
                    .filter((titleItem) => titleItem.titleComponentName === title)
                    .map((titleItem) => {
                        const deviceStateComponent = {
                            id: titleItem.id,
                            name: titleItem.name,
                            groupTypeId: titleItem.groupTypeId,
                            titleComponentId: titleItem.titleComponentId,
                            inspectionDeviceStateId: titleItem.inspectionDeviceStateId,
                            value: titleItem.value,
                            note: titleItem.note,
                            isUsingNote: titleItem.isUsingNote,
                            displayOrder: titleItem.displayOrder,
                            deviceStateValues: deviceStateValues.filter(
                                (value) =>
                                    value.componentElementTitleId ===
                                    titleItem.componentElementTitleId,
                            ),
                        };
                        return deviceStateComponent;
                    }),
            };
            titleComponents.push(titleComponent);
        }

        finalResult.push({ groupTypeName, titleComponents });
    }

    return finalResult;
};

export const getInspectionDeviceStateByDeviceElements = async (
    inspectionElementIds: string[],
): Promise<InspectionDeviceComponent[]> => {
    const query = `SELECT * FROM Inspection_DeviceState WHERE inspectionDeviceElementId IN (${inspectionElementIds
        .map((id) => `'${id}'`)
        .join(',')})`;
    return executeQuery<InspectionDeviceComponent>({ query });
};
