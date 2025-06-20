import { useState } from "react";

import axiosInstance from "@/lib/axios";

export const useDownloadFile = (uuid: string, filename: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const downloadFile = async () => {
    setIsLoading(true);

    const pathStartsWith = location.pathname.split("/").at(1);

    const includeBody = pathStartsWith === "shared" ? true : false;

    const body = {
      isShared: true,
    };

    try {
      const response = await axiosInstance.post(
        `/download/${uuid}`,
        includeBody ? body : {},
      );

      const url = response.data.url;

      const link = document.createElement("a");

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadFile, isLoading, error };
};
