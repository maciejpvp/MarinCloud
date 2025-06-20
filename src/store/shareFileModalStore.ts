import { create } from "zustand";

type DataType = {
  uuid: string;
  filename: string;
  emails: string[];
};

interface shareFileModalState {
  isOpen: boolean;
  data?: DataType;
  open: (data: DataType) => void;
  close: () => void;
  updateEmails: (email: string, mode: "push" | "delete") => void;
}

export const useShareFileModalStore = create<shareFileModalState>(
  (set, get) => ({
    isOpen: false,
    open: ({ uuid, filename, emails }: DataType) =>
      set({ isOpen: true, data: { uuid, filename, emails } }),
    close: () => set({ isOpen: false, data: undefined }),
    updateEmails: (email, mode = "push") => {
      const data = get().data;

      if (!data) return;

      let newData;

      if (mode === "push") {
        const emails = [...data.emails, email];

        newData = { ...data, emails };
      }
      if (mode === "delete") {
        const emails = data.emails.filter((item) => item !== email);

        newData = { ...data, emails };
      }

      set({ data: newData });
    },
  }),
);
