import { create } from "zustand";

interface checkboxState {
  activeFilesCheckboxes: string[];
  activeFoldersCheckboxes: string[];
  pushCheckbox: (uuid: string, isFolder: boolean) => void;
  removeCheckbox: (uuid: string, isFolder: boolean) => void;
  restoreDefault: () => void;
}

export const useCheckboxStore = create<checkboxState>((set, get) => ({
  activeFilesCheckboxes: [],
  activeFoldersCheckboxes: [],
  pushCheckbox: (uuid: string, isFolder: boolean) => {
    const old = get().activeFilesCheckboxes;

    if (old.includes(uuid)) return;

    const newArr = [...old, uuid];

    if (isFolder) {
      set({ activeFoldersCheckboxes: newArr });
    } else {
      set({ activeFilesCheckboxes: newArr });
    }
  },
  removeCheckbox: (uuid: string, isFolder: boolean) => {
    const old = get().activeFilesCheckboxes;

    const newArr = old.filter((checkbox) => checkbox !== uuid);

    if (isFolder) {
      set({ activeFoldersCheckboxes: newArr });
    } else {
      set({ activeFilesCheckboxes: newArr });
    }
  },
  restoreDefault: () => {
    set({ activeFilesCheckboxes: [], activeFoldersCheckboxes: [] });
  },
}));
