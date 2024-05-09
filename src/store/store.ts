import { create } from 'zustand';
import { InspectionDeviceElement } from '../../database/types';

type InspectionStore = {
    inspectionId: string | null;
    setInspectionId: (id: string | null) => void;
};

export const useInspectionStore = create<InspectionStore>((set) => ({
    inspectionId: null,
    setInspectionId: (id) => set({ inspectionId: id }),
}));

type InspectionDeviceElementsStore = {
    inspectionDeviceElements: InspectionDeviceElement[];
    setInspectionDeviceElements: (elements: InspectionDeviceElement[]) => void;
};

export const useInspectionDeviceElementsStore = create<InspectionDeviceElementsStore>((set) => ({
    inspectionDeviceElements: [],
    setInspectionDeviceElements: (elements) => set({ inspectionDeviceElements: elements }),
}));
