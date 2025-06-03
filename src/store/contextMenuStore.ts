import { create } from "zustand";

interface contextMenuState {
  pos: [number, number];
  openContext: (newPos: [number, number]) => void;
}

export const contextMenuStore = create<contextMenuState>((set) => ({
  pos: [0, 0],
  openContext: (newPos: [number, number]) => {
    const newPosX = newPos[0];
    const newPosY = newPos[1] - 120;

    set({ pos: [newPosX, newPosY] });
    // click the dropdown button to execute context
    document.getElementById("rightContextTrigger")?.click();
  },
}));
