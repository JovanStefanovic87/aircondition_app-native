export type ReportData = {
    company: Company;
    client: Client;
    device: Device;
    inspection: Inspection;
    elementState: ElementState[];
    created_on: string;
    elements: ReportElement[];
    microbiology: Microbiology;
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
    airVolume: number;
    constructionYear: number;
    lastMaintenance: string;
    id: string;
};

type Inspection = {
    type: string;
    date: string;
    next: string;
    images: Image[];
    stateImages: StateImage[];
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
    value: number;
    valueText: string;
    comment: string;
};

type ReportElement = {
    imageId: string;
    imageTitle: string;
    elementValues: {
        p: number;
        'k:': number;
        m: number;
        l: number;
    };
    imageDataUri: string;
};

type Microbiology = {
    text: string;
    labData: LabData[];
};

type LabData = {
    barcode: string;
    elementName: string;
    zoneTitle: string;
    'g-kbe': number;
    mold: number;
    yeast: number;
    resultValue: number;
};
