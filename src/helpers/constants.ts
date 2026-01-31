/**
 * Device State Components - Types
 */

import { ImageTypesByDbTable } from '../../database/types';

export const STATE_TYPES = {
    WHOLE_DEVICE: 1,
    DEVICE_ELEMENT: 2,
};

export const NON_VERIFICATION_GROUP_TYPES = [
    'MIKROBIOLOGISCH',
    'LUFTKEIMZAHLMESSUNG',
    'UMLAUFWASSERUNTERSUCHUNG',
];

export const INSPECTION_TYPES = {
    INITIAL_INSPECTION: 1, // HYGIENE ERSTINSPEKTION
    RISK_ASSESSMENT: 2, // GEF+ÄHRDUNGSBEURTEILUNG
    INITIAL_AND_RISK: 6,
};

export const IMAGE_TYPES: Record<ImageTypesByDbTable, string> = {
    Inspection_Image: 'Inspection_Image',
    DeviceElement_Image: 'DeviceElement_Image',
    Inspection_Element_Title_Group_Image: 'Inspection_Element_Title_Group_Image',
    Inspection_Element_Image: 'Inspection_Element_Image',
    Question_Image: 'Question_Image',
};
