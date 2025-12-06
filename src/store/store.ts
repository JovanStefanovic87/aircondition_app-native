// /src/store/store.ts
import { create } from 'zustand';

type InspectionStore = {
    inspectionId: string | null;
    setInspectionId: (id: string | null) => void;

    isLoading: boolean;
    setIsLoading: (value: boolean) => void;

    loadingText: string | null;
    setLoadingText: (text: string | null) => void;

    error: string | null;
    setError: (msg: string | null) => void;

    success: string | null;
    setSuccess: (msg: string | null) => void;
};

export const useInspectionStore = create<InspectionStore>((set) => ({
    inspectionId: null,
    setInspectionId: (id) => set({ inspectionId: id }),

    isLoading: false,
    setIsLoading: (value) => set({ isLoading: value }),

    loadingText: null,
    setLoadingText: (text) => set({ loadingText: text }),

    error: null,
    setError: (msg) => set({ error: msg }),

    success: null,
    setSuccess: (msg) => set({ success: msg }),
}));

// 🔹 Store za Inspection Device Elements
export const useInspectionDeviceElementsStore = create<{
    inspectionDeviceElements: any[];
    setInspectionDeviceElements: (elements: any[]) => void;
}>((set) => ({
    inspectionDeviceElements: [],
    setInspectionDeviceElements: (elements) => set({ inspectionDeviceElements: elements }),
}));

// 🔹 Store za sortiranje Device Elementa
export const useDeviceElementSortStore = create<{
    deviceOrder: string[];
    setDeviceOrder: (order: string[]) => void;
}>((set) => ({
    deviceOrder: [],
    setDeviceOrder: (order) => set({ deviceOrder: order }),
}));
