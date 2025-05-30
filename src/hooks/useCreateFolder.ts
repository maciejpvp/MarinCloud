import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../lib/axios";

const uploadFile = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const response = await axiosInstance.post("/create-folder", {
    path: `${pathAfterDrive}`,
    name: "testFolder",
  });

  return response.data;
};

export const useCreateFolder = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};
