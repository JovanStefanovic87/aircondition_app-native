//E:\Programiranje\DEV\AC_INSPECTOR\database\dataAccess\Query\sqlQueries.ts
import { STATE_TYPES } from '../../../src/helpers/constants';
import {
    Client,
    ComponentElementTitle,
    DatabaseVersionType,
    DeviceElement,
    DeviceElementCompletionState,
    DeviceElementPosition,
    DeviceElementType,
    DeviceStateByInspection,
    DeviceStateComponent,
    DeviceStateComponentsForInspection,
    DeviceStateValueDetails,
    DeviceType,
    InspectionElementsForReport,
    ImageStorage,
    Inspection,
    InspectionAndImageStorage,
    InspectionData,
    InspectionDeviceComponent,
    InspectionDeviceElement,
    InspectionDeviceStatesForReport,
    InspectionElement,
    InspectionQuestion,
    InspectionQuestionWithDetails,
    InspectionStatus,
    InspectionType,
    InspectionUpdate,
    QuestionComponent,
    QuestionGroup,
    QuestionGroupForUI,
    TitleComponent,
    TypedQuestionGroupForUI,
    User,
    DeviceStateElementForInspection,
} from '../../types';
import { executeQuery, executeQuerySimple, executeQuerySingle } from './baseQuery';
import { inspectionTypeLookup } from '../../constants';

export const getDBVersionTable = async (): Promise<DatabaseVersionType[]> => {
    const query = `SELECT * FROM DatabaseVersion`;
    return executeQuery<DatabaseVersionType>({ query });
};

//========================================================================================================================================

export const getUserByEmail = async (email: string): Promise<User> => {
    const query = `SELECT id, name, roleId, email, password FROM User WHERE email = '${email}'`;
    return executeQuerySingle<User>({ query });
};

export const getUserById = async (id: string): Promise<User> => {
    const query = `SELECT id, name, roleId, email, password FROM User WHERE id = '${id}'`;
    return executeQuerySingle<User>({ query });
};

export const getAllUsers = async (): Promise<User[]> => {
    const query = `SELECT id, name, roleId, email FROM User`;
    return executeQuery<User>({ query });
};

//========================================================================================================================================

export const getInspectionTypes = async (): Promise<InspectionType[]> => {
    const query = `SELECT * FROM InspectionType order by sortOrder`;
    return executeQuery<InspectionType>({ query });
};

export const getInspectionType = async (inspectionId: string): Promise<number> => {
    const query = `SELECT inspectionTypeId FROM Inspection WHERE id = '${inspectionId}'`;
    return executeQuerySimple<number>(query);
};

export const getInspectionStatus = async (): Promise<InspectionStatus[]> => {
    const query = `SELECT * FROM InspectionStatus`;
    return executeQuery<InspectionStatus>({ query });
};

export const getInspections = async (): Promise<Inspection[]> => {
    const query = `SELECT * FROM Inspection where isDeleted = false`;
    return executeQuery<Inspection>({ query });
};

export const getInspectionById = async (inspectionId: string): Promise<InspectionUpdate> => {
    const query = `SELECT * FROM Inspection where id = '${inspectionId}'`;
    return executeQuerySingle<InspectionUpdate>({ query });
};

export const getInspectionByIdWithDetails = async (
    inspectionId: string,
): Promise<InspectionData> => {
    const query = `SELECT i.*, it.name as inspectioTypeName, dt.name as deviceTypeName FROM Inspection i
            LEFT JOIN InspectionType it ON i.inspectionTypeId = it.id
            LEFT JOIN DeviceType dt ON i.deviceTypeId = dt.id
        WHERE i.id = '${inspectionId}'`;

    return executeQuerySingle<InspectionData>({ query });
};

//========================================================================================================================================

export const getDeviceTypes = async (): Promise<DeviceType[]> => {
    const query = `SELECT * FROM DeviceType`;
    return executeQuery<DeviceType>({ query });
};

export const getInspectionDeviceStateForElements = async (
    inspectionId: string,
): Promise<InspectionDeviceComponent[]> => {
    const query = `
        SELECT ids.*,dsc.groupTypeId FROM Component_Element_Title cet
        LEFT JOIN DeviceStateComponent dsc ON dsc.id = cet.deviceStateComponentId
        LEFT JOIN Inspection_DeviceState ids ON ids.componentElementTitleId = cet.id
        WHERE dsc.stateTypeId=${STATE_TYPES.DEVICE_ELEMENT} AND ids.inspectionId = '${inspectionId}'`;

    return executeQuery<InspectionDeviceComponent>({ query });
};

export const getInspectionDeviceStateForReport = async (
    inspectionId: string,
): Promise<InspectionDeviceStatesForReport[]> => {
    const query = `
        SELECT ids.*, dsc.groupTypeId FROM Component_Element_Title cet
        LEFT JOIN DeviceStateComponent dsc ON dsc.id = cet.deviceStateComponentId
        LEFT JOIN Inspection_DeviceState ids ON ids.componentElementTitleId = cet.id
        WHERE dsc.stateTypeId=${STATE_TYPES.DEVICE_ELEMENT} AND ids.inspectionId = '${inspectionId}'`;

    return executeQuery<InspectionDeviceStatesForReport>({ query });
};

export const getInspectionElementsForReport = async (
    inspectionId: string,
): Promise<InspectionElementsForReport[]> => {
    const query = `
        SELECT 
            ide.id as imageId, de.name as imageTitle, s.storagePathS3 as imageDataUri, ide.elementPositionId
        FROM Inspection_DeviceElement ide
            LEFT JOIN DeviceElement de ON de.id = ide.deviceElementId
            LEFT JOIN DeviceElement_Image dei ON dei.deviceElementId = de.id
            RIGHT JOIN ImageStorage s ON s.id = dei.imageId
        WHERE ide.inspectionId = '${inspectionId}'`;

    return executeQuery<InspectionElementsForReport>({ query });
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
            cet.displayOrder,  tc.name as titleComponentName, cet.id as componentElementTitleId, dsc.placeholder, 
            cet.isUsingMeasurementCheckbox
            
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
                            isUsingMeasurementCheckbox: titleItem.isUsingMeasurementCheckbox,
                            displayOrder: titleItem.displayOrder,
                            deviceStateValues: deviceStateValues.filter(
                                (value) =>
                                    value.componentElementTitleId ===
                                    titleItem.componentElementTitleId,
                            ),
                            placeholder: titleItem.placeholder,
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

//========================================================================================================================================

export const getDeviceElements = async (): Promise<DeviceElement[]> => {
    const query = `SELECT * FROM DeviceElement`;
    return executeQuery<DeviceElement>({ query });
};

export const getElementStateComponents = async (): Promise<DeviceStateComponent[]> => {
    const query = `SELECT * FROM DeviceStateComponent WHERE elementId IS NOT NULL`;
    return executeQuery<DeviceStateComponent>({ query });
};

export const getDeviceElementTypes = async (): Promise<DeviceElementType[]> => {
    const query = `SELECT * FROM DeviceElementType`;
    return executeQuery<DeviceElementType>({ query });
};

export const getInspectionDeviceElements = async (
    inspectionId: string,
): Promise<InspectionDeviceElement[]> => {
    const query = `
        SELECT ide.*, de.imageFileName, de.deviceElementTypeId FROM Inspection_DeviceElement ide
        LEFT JOIN DeviceElement de ON de.id = ide.deviceElementId
        WHERE ide.inspectionId = '${inspectionId}'`;
    return executeQuery<InspectionDeviceElement>({ query });
};

export const getInspectionDeviceElementsBase = async (
    inspectionId: string,
): Promise<InspectionElement[]> => {
    const query = `SELECT * FROM Inspection_DeviceElement WHERE inspectionId = '${inspectionId}'`;
    return executeQuery<InspectionElement>({ query });
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
            dsc.id, ids.inspectionId, cet.deviceStateComponentId, ids.id as inspectionDeviceStateId, cet.deviceElementId, 
            ids.inspectionDeviceElementId, ids.value, ids.note, dsc.name, dsc.groupTypeId, cet.titleComponentId, gt.name as groupTypeName, cet.isUsingNote, 
            cet.displayOrder,  tc.name as titleComponentName, cet.id as componentElementTitleId, dsc.placeholder, cet.isUsingMeasurementCheckbox
            
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
): Promise<DeviceStateElementForInspection[]> => {
    const inspectionDeviceStateByGroupType = await getInspectionElementStateByGroupType(
        inspectionId,
        inspectionElementId,
    );

    const deviceStateValues = await getDeviceStateValues();

    const uniqueGroupTypeNames = [
        ...new Set(inspectionDeviceStateByGroupType.map((item) => item.groupTypeName)),
    ];
    const finalResult: DeviceStateElementForInspection[] = [];

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
                            isUsingMeasurementCheckbox: titleItem.isUsingMeasurementCheckbox,
                            displayOrder: titleItem.displayOrder,
                            deviceStateValues: deviceStateValues.filter(
                                (value) =>
                                    value.componentElementTitleId ===
                                    titleItem.componentElementTitleId,
                            ),
                            placeholder: titleItem.placeholder,
                        };
                        return deviceStateComponent;
                    }),
            };
            titleComponents.push(titleComponent);
        }

        finalResult.push({
            groupTypeName,
            titleComponents,
            inspectionDeviceElementId:
                inspectionDeviceStateByGroupType[0].inspectionDeviceElementId,
        });
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

export const getDeviceElementCompletionState = async (
    inspectionId: string,
): Promise<DeviceElementCompletionState[]> => {
    const query = `
      SELECT 
        ids.inspectionDeviceElementId,
        COUNT(CASE WHEN ids.value IS NOT NULL THEN 1 END) = COUNT(*) AS isCompleted
      FROM 
        Inspection_DeviceState AS ids
      LEFT JOIN 
        Component_Element_Title AS cet
        ON ids.componentElementTitleId = cet.id
      LEFT JOIN 
        DeviceStateComponent AS dsc
        ON cet.deviceStateComponentId = dsc.id
      LEFT JOIN 
        GroupType AS gt
        ON dsc.groupTypeId = gt.id
      WHERE 
        ids.inspectionId = '${inspectionId}'
        AND ids.inspectionDeviceElementId IS NOT NULL
        AND gt.name IN ('PHYSIKALISCH', 'KONSTRUKTIV')
      GROUP BY 
        ids.inspectionDeviceElementId
    `;

    return executeQuery<DeviceElementCompletionState>({ query });
};

//========================================================================================================================================

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

export const getImageStorageById = async (imageId: string): Promise<ImageStorage> => {
    const query = `
        SELECT * FROM ImageStorage WHERE id = '${imageId}'`;
    return executeQuerySingle<ImageStorage>({ query });
};

export const getInspectionImages = async (inspectionId: string): Promise<ImageStorage[]> => {
    const query = `
        SELECT s.* FROM Inspection_Image ii
        LEFT JOIN ImageStorage s ON s.id = ii.imageId
        WHERE ii.inspectionId = '${inspectionId}'`;
    return executeQuery<ImageStorage>({ query });
};

export const getInspectionTitleGroupImages = async (
    inspectionId: string,
    titleId: number,
    groupId: number,
): Promise<ImageStorage[]> => {
    const query = `
        SELECT s.* FROM Inspection_Title_Group_Image g
        LEFT JOIN ImageStorage s ON s.id = g.imageId
        WHERE 
            g.inspectionId = '${inspectionId}' and
            g.titleComponentId = ${titleId} and
            g.groupTypeId = ${groupId}
    `;
    return executeQuery<ImageStorage>({ query });
};

export const getInspectionElementTitleGroupImages = async (
    inspectionDeviceElementId: string,
    titleId: number,
    groupId: number,
): Promise<ImageStorage[]> => {
    const query = `
        SELECT s.* FROM Inspection_Element_Title_Group_Image g
        LEFT JOIN ImageStorage s ON s.id = g.imageId
        WHERE 
            g.inspectionDeviceElementId = '${inspectionDeviceElementId}' and
            g.titleComponentId = ${titleId} and
            g.groupTypeId = ${groupId}
    `;
    return executeQuery<ImageStorage>({ query });
};

export const getInspectionElementImages = async (
    inspectionDeviceElementId: string,
): Promise<ImageStorage[]> => {
    const query = `
        SELECT s.* FROM Inspection_Element_Image g
        LEFT JOIN ImageStorage s ON s.id = g.imageId
        WHERE 
            g.inspectionDeviceElementId = '${inspectionDeviceElementId}'
    `;
    return executeQuery<ImageStorage>({ query });
};

export const getInspectionQuestionImages = async (
    inspectionQuestionId: string,
): Promise<ImageStorage[]> => {
    const query = `
        SELECT s.* FROM InspectionQuestion_Image ii
        LEFT JOIN ImageStorage s ON s.id = ii.imageId
        WHERE ii.inspectionQuestionId = '${inspectionQuestionId}'`;
    return executeQuery<ImageStorage>({ query });
};

export const getAllInspectionImages = async (inspectionId: string): Promise<ImageStorage[]> => {
    const query = `
    SELECT DISTINCT i.*
    FROM ImageStorage i
    
    -- Direct inspection images
    LEFT JOIN Inspection_Image ii
      ON ii.imageId = i.id AND ii.inspectionId = '${inspectionId}'
    
    -- Title/group images per inspection
    LEFT JOIN Inspection_Title_Group_Image itgi
      ON itgi.imageId = i.id AND itgi.inspectionId = '${inspectionId}'
    
    -- Element images through inspectionDeviceElement
    LEFT JOIN Inspection_Element_Image iei
      ON iei.imageId = i.id
    LEFT JOIN Inspection_DeviceElement ide
      ON ide.id = iei.inspectionDeviceElementId
      AND ide.inspectionId = '${inspectionId}'
    
    -- Title/group images per element
    LEFT JOIN Inspection_Element_Title_Group_Image ietgi
      ON ietgi.imageId = i.id
    LEFT JOIN Inspection_DeviceElement ide2
      ON ide2.id = ietgi.inspectionDeviceElementId
      AND ide2.inspectionId = '${inspectionId}'
    
    -- Question images
    LEFT JOIN InspectionQuestion_Image iqi
      ON iqi.imageId = i.id
    LEFT JOIN Inspection_Question iq
      ON iq.id = iqi.inspectionQuestionId
      AND iq.inspectionId = '${inspectionId}'
    
    WHERE ii.inspectionId IS NOT NULL
       OR itgi.inspectionId IS NOT NULL
       OR ide.inspectionId IS NOT NULL
       OR ide2.inspectionId IS NOT NULL
       OR iq.inspectionId IS NOT NULL
  `;

    return executeQuery<ImageStorage>({ query });
};

/**
 * getDeviceElementStateImages - Function that retrieves images for general state of device elements
 * @param deviceElementId - DeviceElement table
 * @returns - records from ImageStorage table for general state images of device states in steps 2 and 4
 */

export const getDeviceElementStateImages = async (
    deviceElementId: number,
): Promise<ImageStorage[]> => {
    const query = `
        SELECT s.* FROM DeviceElement_Image d
        LEFT JOIN ImageStorage s ON s.id = d.imageId
        WHERE d.deviceElementId = ${deviceElementId}`;
    return executeQuery<ImageStorage>({ query });
};

//========================================================================================================================================

export const getQuestionComponents = async (
    inspectionType: number,
): Promise<QuestionComponent[]> => {
    const query = `
        SELECT 
            qc.*,
            it.Name AS InspectionTypeName,
            it.SortOrder AS InspectionTypeSortOrder,
            qg.Name AS QuestionGroupName,
            qg.GroupSymbol AS QuestionGroupSymbol,
            qg.GroupReference AS QuestionGroupReference
        FROM QuestionComponent qc
        LEFT JOIN InspectionType it ON qc.InspectionTypeId = it.Id
        LEFT JOIN QuestionGroup qg ON qc.QuestionGroupId = qg.Id
        WHERE it.Id = ${inspectionType}
    `;
    return executeQuery<QuestionComponent>({
        query,
    });
};

export const getInspectionQuestionsByType = async (
    inspectionId: string,
    inspectionTypeId: number,
): Promise<InspectionQuestionWithDetails[]> => {
    const query = `
        SELECT 
            iq.Id AS inspectionQuestionId,
            iq.inspectionId,
            iq.answerId,
            iq.comment,
            it.name AS inspectionTypeName,
            it.id AS inspectionTypeId,
            qg.id AS questionGroupId,
            qg.name AS questionGroupName,
            qg.groupSymbol,
            qg.groupReference,
            qc.id AS questionId,
            qc.fullDescription,
            qc.displayOrder,
            qc.questionNumber
        FROM Inspection_Question iq
        LEFT JOIN QuestionComponent qc ON iq.questionId = qc.Id
        LEFT JOIN QuestionGroup qg ON qc.QuestionGroupId = qg.Id
        LEFT JOIN InspectionType it ON qc.InspectionTypeId = it.Id
        WHERE qc.inspectionTypeId = ${inspectionTypeId} and iq.inspectionId = '${inspectionId}'
    `;
    return executeQuery<InspectionQuestionWithDetails>({
        query,
    });
};

export const getInspectionQuestions = async (
    inspectionId: string,
): Promise<TypedQuestionGroupForUI[]> => {
    const inspectionTypeId = await getInspectionType(inspectionId);
    const relatedInspectionTypeIds = inspectionTypeLookup[inspectionTypeId] || [inspectionTypeId];

    const allQuestions: InspectionQuestionWithDetails[] = [];

    for (const typeId of relatedInspectionTypeIds) {
        const questionsForType = await getInspectionQuestionsByType(inspectionId, typeId);
        allQuestions.push(...questionsForType);
    }

    // Group questions by inspectionTypeId
    const questionsByType: Record<number, QuestionGroupForUI[]> = {};

    for (const typeId of relatedInspectionTypeIds) {
        const typeQuestions = allQuestions.filter((q) => q.inspectionTypeId === typeId);

        const uniqueGroupNames = [...new Set(typeQuestions.map((q) => q.questionGroupName))];
        const questionGroups: QuestionGroupForUI[] = uniqueGroupNames.map((groupName) => {
            const groupItems = typeQuestions.filter((q) => q.questionGroupName === groupName);
            const groupObject = groupItems[0];

            return {
                groupId: groupObject?.questionGroupId,
                name: groupName,
                groupSymbol: groupObject?.groupSymbol,
                groupReference: groupObject?.groupReference,
                questions: groupItems.map((q) => ({
                    inspectionQuestionId: q.inspectionQuestionId,
                    inspectionId: q.inspectionId,
                    questionId: q.questionId,
                    fullDescription: q.fullDescription,
                    displayOrder: q.displayOrder,
                    questionNumber: q.questionNumber,
                    answerId: q.answerId,
                    comment: q.comment,
                })),
            };
        });

        questionsByType[typeId] = questionGroups;
    }

    const result: TypedQuestionGroupForUI[] = relatedInspectionTypeIds.map((typeId) => {
        const inspectionTypeName =
            allQuestions.find((q) => q.inspectionTypeId === typeId)?.inspectionTypeName ||
            `Type ${typeId}`;

        return {
            inspectionTypeId: typeId,
            inspectionTypeName,
            questionsByGroup: questionsByType[typeId] || [],
        };
    });

    return result;
};

export const getAllInspectionQuestions = async (): Promise<InspectionQuestion[]> => {
    const query = `SELECT * FROM Inspection_Question`;
    return executeQuery<InspectionQuestion>({ query });
};

export const getAllQuestions = async (): Promise<QuestionComponent[]> => {
    const query = `SELECT * FROM QuestionComponent`;
    return executeQuery<QuestionComponent>({ query });
};

export const getQuestionGroups = async (): Promise<QuestionGroup[]> => {
    const query = `SELECT * FROM QuestionGroup`;
    return executeQuery<QuestionGroup>({ query });
};

//========================================================================================================================================

export const getAllClients = async (): Promise<Client[]> => {
    const query = `SELECT * FROM Client where isDeleted = 0`;
    return executeQuery<Client>({ query });
};

export const getClientById = async (clientId: string): Promise<Client> => {
    const query = `
        SELECT * FROM Client WHERE id = '${clientId}'`;
    return executeQuerySingle<Client>({ query });
};

//========================================================================================================================================
