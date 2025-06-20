import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import axiosInstance from "@/lib/axios";
import { useShareFileModalStore } from "@/store/shareFileModalStore";

const unshareFileRequest = async ({
  emailIndex,
  uuid,
}: {
  emailIndex: number;
  uuid: string;
}) => {
  const promise = axiosInstance.delete(`/unshare-file`, {
    data: {
      emailIndex,
      uuid,
    },
  });

  addToast({
    title: "Removing access...",
    description: "We're unsharing the file. Just a sec.",
    promise,
    timeout: 1,
  });

  await promise;
};

export const useUnshareFile = (uuid: string) => {
  const queryClient = useQueryClient();
  const updateEmail = useShareFileModalStore((store) => store.updateEmails);

  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const queryKey = [`files/${pathAfterDrive}`];

  const mutation = useMutation({
    mutationFn: ({ emailIndex }: { emailIndex: number; email: string }) =>
      unshareFileRequest({ emailIndex, uuid }),
    onMutate: (data) => {
      return { emailIndex: data.emailIndex, email: data.email };
    },
    onSuccess: (_data, __, context) => {
      const emailIndex = context.emailIndex;
      const email = context.email;

      queryClient.setQueryData(queryKey, (data: any[]) => {
        return data.map((item) => {
          if (item.uuid === uuid) {
            return {
              ...item,
              sharedTo: item.sharedTo.filter(
                (_: unknown, index: number) => index !== emailIndex,
              ),
            };
          }

          return item;
        });
      });

      updateEmail(email, "delete");

      addToast({
        color: "success",
        title: "Access removed",
        description: "His/Her Access got revoked.",
      });
    },
    onError: () => {
      addToast({
        color: "danger",
        title: "Unshare failed",
        description: "Couldn't remove access. Try again.",
      });
    },
  });

  return {
    unShareFile: (emailIndex: number, email: string) =>
      mutation.mutate({ emailIndex, email }),
    isLoading: mutation.isPending,
    error: mutation.isError,
  };
};
