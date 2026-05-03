export type ReportData = {
    company?: Company;
    client: Client;
    device: Device;
    inspection: Inspection;
    elementState: ElementState[];
    created_on: string;
    elements: ReportElement[];
    checklists?: Checklist[];
};

type ChecklistQuestion = {
    id: string;
    text: string;
    answer: string;
    comment?: string;
    image?: string;
};

type ChecklistSection = {
    number: number;
    title: string;
    reference?: string;
    questions: ChecklistQuestion[];
};

type Checklist = {
    title: string;
    sections: ChecklistSection[];
};

type Company = {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    inspectionTechnician: string;
};

type Client = {
    name: string;
    address: string;
    endClient: string;
    endClientAdress: string;
    endClientSignature: string;
};

type Device = {
    location: string;
    type: string;
    airVolume?: string;
    constructionYear?: string;
    lastMaintenance?: string;
    id: string;
};

type Inspection = {
    type: string;
    date: string;
    next: string;
    images: string[];
    imagePaths: string[];
    state?: GroupState[];
};

type Image = {
    imagePath: string;
};

type StateImage = {
    title: string;
    imagePaths: string[];
};

type ElementState = {
    elementTitle: string;
    imagePaths?: string[];
    state?: GroupState[];
};

type GroupState = {
    groupTypeName: string;
    issues: Issue[];
};

type Issue = {
    title: string;
    value: number | null;
    valueText: string | null;
    comment: string | null;
};

type ReportElement = {
    imageId: string;
    imageTitle: string;
    elementValues: {
        p: number | null;
        k: number | null;
        m: number | null;
        l: number | null;
    };
    imageDataUri: string;
};
