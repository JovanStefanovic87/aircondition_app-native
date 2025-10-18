export type DeviceType = {
    id: number;
    name: string;
};

export type InspectionType = {
    id: number;
    name: string;
};

export type InspectionStatus = {
    id: number;
    name: string;
};

export type DatabaseVersionType = {
    version: number;
};

export type Client = {
    id: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    email: string;
    contactPerson: string;
    isDeleted: boolean;
};

/**
 * @param userId Format of param is UUID.
 * @param createdAt The creation date of the inspection in the format 'YYYY-MM-DDTHH:mm:ssZ'.
 */

export interface InspectionUpdate {
    id?: string;
    clientId?: string;
    clientName: string;
    clientAddress: string;
    clientCity: string;
    endClientName: string;
    endClientAddress: string;
    endClientCity: string;
    barcode: string;
    deviceTypeId: number;
    inspectionTypeId: number;
    facilityName: string;
    location: string;
    contractNumber: string;
    createdAt: string;
    lastInspectionDate?: string;
    nextInspectionDate?: string;
    inspectionDate: string;
    airVolume?: number;
    constructionYear?: number;
    lastMaintenance?: string;
    userId: string;
    inspectionStatusId: number;
    isDeleted?: boolean;
    note?: string;
}

export interface InspectionData extends InspectionUpdate {
    inspectionTypeName: string;
    deviceTypeName: string;
}

/**
 * @param id format of param is UUID.
 */
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    roleId: number;
};

export type AuthenticatedUser = {
    id: string;
    name?: string;
    username: string;
    email?: string;
    roleId?: number;
    token: string;
};

export type UserRole = {
    id: number;
    name: string;
};

/**
 * @param userId Format of param is UUID.
 * @param createdAt The creation date of the inspection in the format 'YYYY-MM-DDTHH:mm:ssZ'.
 */
export type Inspection = {
    id?: string;
    barcode: string;
    deviceTypeId: number;
    inspectionTypeId: number;
    facilityName: string;
    location: string;
    contractNumber: string;
    createdAt: string;
    lastInspectionDate?: string;
    airVolume?: number;
    constructionYear?: number;
    lastMaintenance?: string;
    userId: string;
    inspectionStatusId: number;
    isDeleted?: boolean;
    note?: string;
};

/**
 * @param groupTypeId The id of the group type (Physical, Constructive, Microbiological, Air germ measurement)
 * @param titleComponentId The id of the title component (Gesamt, Anlage);
 * @param elementId When this id present component is considered as a element state component, otherwise it is a device state component.
 * @param isUsingNote Represents if the component is using a input field for notes.
 * @param displayOrder The order of the component for UI display.
 */
export type DeviceStateComponent = {
    id: number;
    name: string;
    groupTypeId: number;
    titleComponentId: number;
    inspectionDeviceStateId: string;
    elementId?: number | null;
    isUsingNote: boolean;
    isUsingMeasurementCheckbox: boolean;
    value: number | null;
    note: string | null;
    displayOrder: number;
    deviceStateValues?: DeviceStateValueDetails[];
    placeholder: string;
};

export type ComponentElementTitle = {
    id: number;
    deviceStateComponentId: number;
    deviceElementId: number;
    titleComponentId: number;
    displayOrder: number;
    isUsingNote: boolean;
};

export type InspectionDeviceComponent = {
    id?: string;
    inspectionId: string;
    componentElementTitleId: number;
    inspectionDeviceElementId: string;
    value?: number;
    note?: string;
    isMeasurementPossible?: boolean;
};

export type InspectionDeviceElement = {
    id: string;
    inspectionId: string;
    deviceElementId: number;
    deviceOrder: number;
    imageFileName: string;
    elementPositionId: number;
};

export type InspectionElement = {
    id: string;
    inspectionId: string;
    deviceElementId: number;
    deviceOrder: number;
    elementPositionId: number;
};

export type InspectionDeviceStateUpdate = {
    id: string;
    value?: number | null;
    note?: string | null;
};

export type ImageDeviceStateSave = {
    titleId: number;
    groupTypeId: number;
};

export type ImageGallery = {
    imageId: string;
    imagePath: string;
    imageType: ImageTypesByDbTable;
};

export type ImageTypesByDbTable =
    | 'Inspection_Image'
    | 'DeviceElement_Image'
    | 'Inspection_Element_Title_Group_Image'
    | 'Question_Image';

export type DeviceStateByInspection = {
    id: number; // DeviceStateComponent
    inspectionId: string; // DeviceStateComponent
    deviceStateComponentId: number; // Component_Element_Title
    inspectionDeviceStateId: string; // Inspection_DeviceState (id)
    deviceElementId: number; // Component_Element_Title
    inspectionDeviceElementId: string; // Inspection_DeviceState
    value: number | null; // Inspection_DeviceState
    note: string | null; // Inspection_DeviceState
    name: string; // Inspection_DeviceState
    groupTypeId: number; // DeviceStateComponent
    titleComponentId: number; // Component_Element_Title
    isUsingNote: boolean; // Component_Element_Title
    isUsingMeasurementCheckbox: boolean; // Component_Element_Title
    displayOrder: number; // Component_Element_Title
    groupTypeName: string; // GroupType (name)
    titleComponentName: string; // TitleComponent (name)
    componentElementTitleId: number; // Component_Element_Title (id)
    placeholder: string; // DeviceStateComponent
};

export type ElementStateByInspection = {
    id: number;
    inspectionId: string;
    deviceStateId: number;
    deviceElementId: number;
    inspectionDeviceStateId: string;
    value: number | null;
    note: string | null;
    name: string;
    groupTypeId: number;
    titleComponentId: number;
    elementId: number | null;
    isUsingNote: boolean;
    displayOrder: number;
    groupTypeName: string;
    titleComponentName: string;
    componentElementTitleId: number;
};

export type DeviceStateValueDetails = {
    id: string;
    componentElementTitleId: number;
    stateValueId: number;
    valueName: string;
};

export type DeviceStateComponentsForInspection = {
    groupTypeName: string;
    titleComponents: TitleComponent[];
};

export type DeviceStateElementForInspection = {
    groupTypeName: string;
    inspectionDeviceElementId: string;
    titleComponents: TitleComponent[];
};

export type TitleComponent = {
    name: string;
    deviceStateComponents: DeviceStateComponent[];
};

export type InspectionImageInsert = {
    inspectionId: string;
    imageId: string;
};

export type DeviceElementImageInsert = {
    deviceElementId: number;
    imageId: string;
};

export type DeviceStateImageInsert = {
    inspectionDeviceElementId: string;
    titleComponentId: number;
    groupTypeId: number;
    imageId: string;
};

export type InspectionTitleGroupImageInsert = {
    inspectionId: string;
    titleComponentId: number;
    groupTypeId: number;
    imageId: string;
};

export type InspectionDeviceElementImageInsert = {
    inspectionDeviceElementId: string;
    imageId: string;
};

export type DeviceElementStateImageInsert = {
    titleComponentId: number;
    groupTypeId: number;
    deviceElementId: number;
    imageId: string;
};

export type ImageStorageInsert = {
    name: string;
    storagePath: string;
};

export type ImageStorage = {
    id: string;
    name: string;
    storagePath: string;
    storagePathS3?: string;
};

export type InspectionAndImageStorage = {
    id: string;
    inspectionid: string;
    imageid: string;
    name: string;
    storagePath: string;
};

export type UploadResponse = {
    id: string;
    storagePathS3: string;
};

export type DeviceElement = {
    id: number;
    name: string;
    deviceElementTypeId: number;
    imageFileName: string;
    imagePath: string;
};

export type DeviceElementType = {
    id: number;
    name: string;
};

export type InspectionDeviceElementUpdate = {
    id?: string;
    inspectionId: string;
    deviceElementId: number;
    deviceOrder: number;
    elementPositionId: number;
};

export type DeviceElementSortUpdate = {
    id?: string;
    deviceOrder: number;
};

export type DeviceElementPosition = {
    id: number;
    name: string;
};

export type DeviceElementCompletionState = {
    inspectionDeviceElementId: string;
    isCompleted: boolean;
};

export interface QuestionComponent {
    id: number;
    name: string;
    inspectionTypeId: number;
    questionGroupId: number;
    fullDescription: string;
    displayOrder: number;
    questionNumber: number;

    // Fields from InspectionType
    inspectionTypeName?: string;
    inspectionTypeSortOrder?: number;

    // Fields from QuestionGroup
    questionGroupName?: string;
    questionGroupSymbol?: string;
    questionGroupReference?: string;
}

export interface InspectionQuestion {
    id?: string;
    inspectionId: string;
    questionId: number;
    answer?: string;
    comment?: string;
}

export interface Question {
    questionId: number;
    answerId: number;
    comment: string;
    fullDescription: string;
    displayOrder: number;
    questionNumber: string;
}

export interface QuestionGroup {
    questionGroupId: number;
    questionGroupName: string;
    groupSymbol: string;
    groupReference: string;
    questions: Question[];
}

export interface QuestionByInspectionType {
    inspectionTypeName: string;
    inspectionTypeId: number;
    questions: QuestionGroup[];
}

export type QuestionsByInspectionType = QuestionByInspectionType[];

export interface InspectionQuestionWithDetails {
    inspectionQuestionId: string;
    inspectionId: string;
    inspectionTypeName: string;
    inspectionTypeId: number;
    questionGroupId: number;
    questionGroupName: string;
    groupSymbol: string;
    groupReference: string;
    questionId: number;
    fullDescription: string;
    displayOrder: number;
    questionNumber: string;
    answerId: number;
    comment: string;
}

export interface QuestionGroupForUI {
    groupId: number | undefined;
    name: string;
    groupSymbol: string | undefined;
    groupReference: string | undefined;
    questions: InspectionQuestionForUI[];
}

export interface InspectionQuestionForUI {
    inspectionQuestionId: string;
    inspectionId: string;
    questionId: number;
    fullDescription: string;
    displayOrder: number;
    questionNumber: string;
    answerId: number;
    comment: string;
}

export interface TypedQuestionGroupForUI {
    inspectionTypeId: number;
    inspectionTypeName: string;
    questionsByGroup: QuestionGroupForUI[];
}

export interface InspectionQuestionUpdate {
    id: string;
    answerId: string;
    comment: string;
}

export type ClientUpdate = {
    id?: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    email: string;
    contactPerson: string;
    isDeleted: boolean;
};

export type InspectionQuestionInsert = {
    inspectionQuestionId: string;
    imageId: string;
};

export type InspectionElementsForReport = {
    inspectionDeviceElementId: string;
    imageTitle: string;
    elementValues: Record<string, number>;
    imageDataUri: string;
    elementPositionId: number;
};

export type InspectionDeviceStatesForReport = {
    id?: string;
    inspectionId: string;
    componentElementTitleId: number;
    inspectionDeviceElementId: string;
    value?: number;
    note?: string;
    isMeasurementPossible?: boolean;
    groupTypeId: number;
};
