import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../lib/axios";

const createFolder = async (name: string) => {
  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const response = await axiosInstance.post("/create-folder", {
    path: `${pathAfterDrive}`,
    name,
  });

  return response.data;
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: (data) => {
      const newFolder = data.item;
      const pathAfterDrive =
        location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

      const queryKey = [`files/${pathAfterDrive}`];

      queryClient.setQueryData<any[]>(queryKey, (old = []) => [
        ...old,
        newFolder,
      ]);
    },
  });
};
