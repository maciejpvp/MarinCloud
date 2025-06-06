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

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const queryKey = [`files/${pathAfterDrive}`];

  return useMutation({
    mutationFn: createFolder,
    onMutate: (name: string) => {
      const tempFolder = {
        fileName: name,
        isFolder: true,
        uuid: "temp",
        isOptimistic: true, // so component know its optimistic
      };

      queryClient.setQueryData<any[]>(queryKey, (old = []) => [
        ...old,
        tempFolder,
      ]);
    },
    onSuccess: (data) => {
      const newFolder = data.item;

      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.filter((item) => item.uuid !== "temp"),
      );

      queryClient.setQueryData<any[]>(queryKey, (old = []) => [
        ...old,
        newFolder,
      ]);
    },
    onError: () => {
      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.filter((item) => item.uuid !== "temp"),
      );
    },
  });
};
