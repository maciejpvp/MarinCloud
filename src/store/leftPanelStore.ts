import { create } from "zustand";

interface LeftPanelState {
  leftWidth: number;
  setLeftWidth: (number: number) => void;
}

export const useLeftPanelStore = create<LeftPanelState>((set) => ({
  leftWidth: 300,
  setLeftWidth: (number) => set({ leftWidth: number }),
}));
