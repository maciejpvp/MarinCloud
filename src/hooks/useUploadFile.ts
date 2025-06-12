import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import axiosInstance from "../lib/axios";

const uploadFile = async (
  file: File,
  onProgress?: (progress: number) => void,
) => {
  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const filename = file.name;

  const response = await axiosInstance.post("/upload-file", {
    filename,
    path: pathAfterDrive,
    filesize: file.size,
  });

  const uploadLink = response.data.signedUrl;

  const formData = new FormData();

  const fields: Record<string, string> = response.data.fields;

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("file", file);

  await axios.post(uploadLink, formData, {
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

export const useUploadFile = (
  setUploading: (value: boolean) => void,
  setUploadProgress: (value: number) => void,
) => {
  const queryClient = useQueryClient();

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const queryKey = [`files/${pathAfterDrive}`];

  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => uploadFile(file, onProgress),

    onMutate: ({
      file,
      onProgress: _onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => {
      const fileName = file.name;

      const tempFile = {
        fileName,
        uuid: "temp",
        isFolder: false,
        isOptimistic: true,
      };

      queryClient.setQueryData<any[]>(queryKey, (old = []) => [
        ...old,
        tempFile,
      ]);

      return { fileSize: file.size };
    },

    onSuccess: (data, __, context) => {
      setUploading(false);
      setUploadProgress(0);

      const file = { ...data.item, size: context.fileSize ?? 0 };

      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.filter((item) => item.uuid !== "temp"),
      );

      queryClient.setQueryData<any[]>(queryKey, (old = []) => [...old, file]);

      queryClient.setQueryData<number>(["usedStorage"], (old = 0) => {
        return old + (context.fileSize ?? 0);
      });
    },

    onError: () => {
      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.filter((item) => item.uuid !== "temp"),
      );

      setUploading(false);
      setUploadProgress(0);
    },
  });
};
