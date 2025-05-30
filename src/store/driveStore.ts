import { create } from "zustand";

interface DriveState {
  path: string;
  setPath: (newPath: string) => void;
}

export const driveStore = create<DriveState>((set) => ({
  path: "",
  setPath: (newPath: string) => set({ path: newPath }),
}));
