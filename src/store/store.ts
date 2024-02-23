import { create } from 'zustand';

type InspectionStore = {
    inspectionId: string | null;
    setInspectionId: (id: string | null) => void;
};

export const useInspectionStore = create<InspectionStore>((set) => ({
    inspectionId: null,
    setInspectionId: (id) => set({ inspectionId: id }),
}));
