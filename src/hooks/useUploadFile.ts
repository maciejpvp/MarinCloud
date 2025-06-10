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
  });

  const uploadLink = response.data.signedUrl;

  await axios.put(uploadLink, file, {
    headers: {
      "Content-Type": `${file.type}`,
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
    },

    onSuccess: (data) => {
      setUploading(false);
      setUploadProgress(0);

      const file = data.item;

      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.filter((item) => item.uuid !== "temp"),
      );

      queryClient.setQueryData<any[]>(queryKey, (old = []) => [...old, file]);
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
