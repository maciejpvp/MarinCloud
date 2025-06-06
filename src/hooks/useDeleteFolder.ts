import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import axiosInstance from "../lib/axios";

let globalUuids: string[] = [];

const deleteFile = async (uuids: string[]) => {
  const response = await axiosInstance.delete("/delete-folder", {
    data: {
      uuids,
    },
  });

  return response.data;
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const queryKey = [`files/${pathAfterDrive}`];

  return useMutation({
    mutationFn: deleteFile,
    onMutate: (uuid: string | string[]) => {
      globalUuids = Array.isArray(uuid) ? uuid : [uuid];

      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.map((item) =>
          globalUuids.includes(item.uuid)
            ? { ...item, isOptimistic: true }
            : item,
        ),
      );
    },

    onSuccess: () => {
      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.filter((item) => !globalUuids.includes(item.uuid)),
      );

      addToast({
        title: "Deleted Successfully",
        description: "File Deleted Successfully.",
        color: "success",
      });
    },

    onError: () => {
      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.map((item) =>
          globalUuids.includes(item.uuid)
            ? { ...item, isOptimistic: false }
            : item,
        ),
      );

      addToast({
        title: "Deletion Failed",
        description: "Unable to delete folder, please try again",
        color: "danger",
      });
    },
  });
};
