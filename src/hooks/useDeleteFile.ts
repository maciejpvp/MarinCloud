import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../lib/axios";

let globalUuid: string = ""; //Global UUID so onSuccess has access to provided uuid;

const deleteFile = async (uuid: string) => {
  const response = await axiosInstance.delete("/delete-file", {
    data: {
      uuid,
    },
  });

  return response.data;
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const queryKey = [`files/${pathAfterDrive}`];

  return useMutation({
    mutationFn: deleteFile,

    onMutate: (uuid: string) => {
      globalUuid = uuid;

      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.map((item) =>
          item.uuid === uuid ? { ...item, isOptimistic: true } : item,
        ),
      );
    },

    onSuccess: () => {
      addToast({
        title: "Deleted Successfully",
        description: "File Deleted Successfully.",
        color: "success",
      });

      queryClient.setQueryData<any[]>(queryKey, (old = []) => {
        const newArray = old.filter((item) => item.uuid !== globalUuid);

        return newArray;
      });
    },
    onError: () => {
      queryClient.setQueryData<any[]>(queryKey, (old = []) =>
        old.map((item) =>
          item.uuid === globalUuid ? { ...item, isOptimistic: false } : item,
        ),
      );

      addToast({
        title: "Deletion Failed",
        description: "Unable to delete file, please try again",
        color: "danger",
      });
    },
  });
};
