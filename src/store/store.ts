import { create } from 'zustand';
import { InspectionDeviceElement, DeviceElementSortUpdate } from '../../database/types';

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

type DeviceElementSortState = {
    deviceOrder: number;
    setDeviceOrder: (newOrder: number) => void; // Adjusted type
};

export const useDeviceElementSortStore = create<DeviceElementSortState>((set) => ({
    deviceOrder: 0,
    setDeviceOrder: (newOrder) => set({ deviceOrder: newOrder }),
}));
