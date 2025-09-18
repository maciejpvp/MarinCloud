import { create } from "zustand";

interface TextEditorModalState {
  isOpen: boolean;
  filename: string;
  uuid: string;
  open: (filename: string, uuid: string) => void;
  close: () => void;
}

export const useTextEditorModalStore = create<TextEditorModalState>((set) => ({
  isOpen: false,
  filename: "",
  uuid: "",
  open: (filename, uuid) =>
    set({
      isOpen: true,
      filename,
      uuid,
    }),
  close: () =>
    set({
      isOpen: false,
      filename: "",
      uuid: "",
    }),
}));
