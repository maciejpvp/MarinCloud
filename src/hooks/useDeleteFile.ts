import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../lib/axios";
import { addToast } from "@heroui/toast";

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
      const pathAfterDrive =
        location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

      const queryKey = [`files/${pathAfterDrive}`];

      queryClient.setQueryData<any[]>(queryKey, (old = []) => {
        const uuid = data.dynamoResult.Item.uuid;
        const newArray = old.filter((item) => item.uuid !== uuid);

        return newArray;
      });
      addToast({
        title: "Deleted Successfully",
        description: "File Deleted Successfully.",
        color: "success",
      });
    },
  });
};
