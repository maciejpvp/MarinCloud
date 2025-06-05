import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../lib/axios";
import { addToast } from "@heroui/toast";

const deleteFile = async (uuid: string) => {
  const response = await axiosInstance.delete("/delete-folder", {
    data: {
      uuid,
    },
  });

  return response.data;
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onError: () => {
      addToast({
        title: "Deletion Failed",
        description: "Unable to delete file, please try again",
        color: "danger",
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
