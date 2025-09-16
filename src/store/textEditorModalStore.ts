import { create } from "zustand";

interface TextEditorModalState {
  isOpen: boolean;
  filename: string;
  value: string;
  open: (filename: string, initialValue?: string) => void;
  close: () => void;
  setValue: (value: string) => void;
}

export const useTextEditorModalStore = create<TextEditorModalState>((set) => ({
  isOpen: false,
  filename: "",
  value: "",
  open: (filename, initialValue = "") =>
    set({
      isOpen: true,
      filename,
      value: initialValue,
    }),
  close: () =>
    set({
      isOpen: false,
      filename: "",
      value: "",
    }),
  setValue: (value) => set({ value }),
}));
