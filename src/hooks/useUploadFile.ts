import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../lib/axios";

const uploadFile = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  formData.append("path", `${pathAfterDrive}`);

  const response = await axiosInstance.post("/upload-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      console.log("UPLOADED SUCCESSFULLY");
    },
  });
};
