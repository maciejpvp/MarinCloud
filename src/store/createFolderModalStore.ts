import { create } from "zustand";

interface createFolderModalState {
  isOpen: boolean;
  toggle: () => void;
}

export const createFolderModalStore = create<createFolderModalState>(
  (set, get) => ({
    isOpen: false,
    toggle: () => {
      const isOpen = get().isOpen;

      set({ isOpen: !isOpen });
    },
  }),
);
