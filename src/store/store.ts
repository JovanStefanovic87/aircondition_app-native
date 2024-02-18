import { create } from 'zustand';

type InspectionStore = {
  newInspectionId: string | null;
  setNewInspectionId: (id: string | null) => void;
};

export const useInspectionStore = create<InspectionStore>((set) => ({
  newInspectionId: null,
  setNewInspectionId: (id) => set({ newInspectionId: id }),
}));
