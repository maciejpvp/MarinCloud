import { create } from "zustand";

interface ImageViewerState {
  isOpen: boolean;
  filename: string;
  uuid: string;
  open: (filename: string, uuid: string) => void;
  close: () => void;
}

export const useImageViewerStore = create<ImageViewerState>((set) => ({
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
