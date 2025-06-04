import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../lib/axios";

const uploadFile = async (
  file: File,
  onProgress?: (progress: number) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  formData.append("path", `${pathAfterDrive}`);

  const response = await axiosInstance.post("/upload-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        if (onProgress) onProgress(percent);
      }
    },
  });

  return response.data;
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => uploadFile(file, onProgress),
    onSuccess: () => {
      console.log("UPLOADED SUCCESSFULLY");
    },
  });
};
