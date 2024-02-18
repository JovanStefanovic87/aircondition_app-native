import {
    DatabaseVersionType,
    DeviceStateByInspection,
    DeviceStateComponent,
    DeviceStateComponentsForInspection,
    DeviceStateValueDetails,
    DeviceType,
    Inspection,
    InspectionDeviceComponentUpdate,
    InspectionType,
    TitleComponent,
    User,
} from '../../types';
import { executeQuery } from './baseQuery';

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

export const getUser = async (): Promise<User[]> => {
    const query = `SELECT id, name, roleId, userName FROM User WHERE userName = 'darko' AND password = 'hashed_password'`;
    return executeQuery<User>({ query });
};

export const getInspections = async (): Promise<Inspection[]> => {
    const query = `SELECT * FROM Inspection`;
    return executeQuery<Inspection>({ query });
};

export const getDeviceStateComponents = async (): Promise<DeviceStateComponent[]> => {
    const query = `SELECT * FROM DeviceStateComponent`;
    return executeQuery<DeviceStateComponent>({ query });
};

export const getElementStateComponents = async (): Promise<DeviceStateComponent[]> => {
    const query = `SELECT * FROM DeviceStateComponent WHERE elementId IS NOT NULL`;
    return executeQuery<DeviceStateComponent>({ query });
};

export const getInspectionDeviceState = async (): Promise<InspectionDeviceComponentUpdate[]> => {
    const query = `SELECT * FROM Inspection_DeviceState`;
    return executeQuery<InspectionDeviceComponentUpdate>({ query });
};

export const getInspectionDeviceStateByGroupType = async (
    inspectionId: string,
): Promise<DeviceStateByInspection[]> => {
    const query = `
        SELECT dsc.*, gt.name as groupTypeName, tc.name as titleComponentName, ids.id as inspectionDeviceStateId, ids.value, ids.note FROM DeviceStateComponent dsc
            
        LEFT JOIN GroupType gt ON gt.id=dsc.groupTypeId
        LEFT JOIN TitleComponent tc ON tc.id = dsc.titleComponentId
        LEFT JOIN Inspection_DeviceState ids ON ids.deviceStateId = dsc.id
    
        WHERE ids.inspectionId='${inspectionId}'
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
                            elementId: titleItem.elementId,
                            value: titleItem.value,
                            note: titleItem.note,
                            isUsingNote: titleItem.isUsingNote,
                            displayOrder: titleItem.displayOrder,
                            deviceStateValues: deviceStateValues.filter(
                                (value) => value.deviceStateComponentId === titleItem.id,
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
