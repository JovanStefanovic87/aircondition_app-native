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

/**
 * @param userId Format of param is UUID.
 * @param createdAt The creation date of the inspection in the format 'YYYY-MM-DDTHH:mm:ssZ'.
 */
export type InspectionUpdate = {
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
 * @param id format of param is UUID.
 */
export type User = {
    id: string;
    name: string;
    userName: string;
    password: string;
    roleId: number;
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
    imagePath: string;
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

export type DeviceStateByInspection = {
    id: number;
    inspectionId: string;
    deviceStateId: number;
    inspectionDeviceStateId: string;
    value: number | null;
    note: string | null;
    name: string;
    groupTypeId: number;
    titleComponentId: number;
    elementId: number | null;
    isUsingNote: boolean;
    isUsingMeasurementCheckbox: boolean;
    displayOrder: number;
    groupTypeName: string;
    titleComponentName: string;
    componentElementTitleId: number;
    placeholder: string;
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
    titleComponentId: number;
    groupTypeId: number;
    imageId: string;
    deviceElementId?: number | null;
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
};

export type InspectionAndImageStorage = {
    id: string;
    inspectionid: string;
    imageid: string;
    name: string;
    storagePath: string;
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
