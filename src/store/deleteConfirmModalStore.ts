import { create } from "zustand";

interface deleteConfirmModalState {
  isOpen: boolean;
  callback: () => void;
  setCallback: (callback: () => void) => void;
  open: () => void;
  close: () => void;
}

export const useDeleteConfirmModalStore = create<deleteConfirmModalState>(
  (set) => ({
    isOpen: false,
    callback: () => {},
    setCallback: (callback) => set({ callback }),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }),
);
