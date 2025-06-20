import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import axiosInstance from "@/lib/axios";
import { useShareFileModalStore } from "@/store/shareFileModalStore";

const shareFileRequest = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const promise = axiosInstance.post(`/share-file`, {
    email,
    uuid,
  });

  addToast({
    title: "Sharing file...",
    description: "Almost done!",
    promise,
    timeout: 1,
  });

  await promise;

  return true;
};

export const useShareFile = (uuid: string) => {
  const queryClient = useQueryClient();
  const updateEmails = useShareFileModalStore((store) => store.updateEmails);
  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const queryKey = [`files/${pathAfterDrive}`];

  const mutation = useMutation({
    mutationFn: ({ email }: { email: string }) =>
      shareFileRequest({ email, uuid }),
    onMutate: (data) => {
      return { email: data.email };
    },
    onSuccess: (_x, __, context) => {
      const email = context.email;

      queryClient.setQueryData(queryKey, (old: any[] = []) => {
        const newArr = old.map((item) => {
          if (item.uuid === uuid) {
            return {
              ...item,
              sharedTo: [...(item.sharedTo || []), email],
            };
          }

          return item;
        });

        updateEmails(email, "push");

        return newArr;
      });

      addToast({
        color: "success",
        title: "File shared!",
        description: "Your file was sent successfully.",
      });
    },
    onError: () => {
      addToast({
        color: "danger",
        title: "Sharing failed",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  return {
    shareFile: (email: string) => mutation.mutate({ email }),
    isLoading: mutation.isPending,
    error: mutation.isError,
  };
};
