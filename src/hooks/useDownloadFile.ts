import { useState } from "react";

import axiosInstance from "@/lib/axios";

type FileMode = "text" | "json" | "blob" | undefined;

export const useDownloadFile = (uuid: string, filename: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const downloadFile = async (
    mode?: FileMode,
  ): Promise<string | object | Blob | void> => {
    setIsLoading(true);

    const pathStartsWith = location.pathname.split("/").at(1);
    const includeBody = pathStartsWith === "shared";

    try {
      // get presigned url
      const response = await axiosInstance.post(
        `/download/${uuid}`,
        includeBody ? { isShared: true } : {},
      );

      const url = response.data.url;

      // if user asked for output instead of download
      if (mode) {
        const fileResponse = await fetch(url);

        if (mode === "text") {
          return await fileResponse.text();
        }

        if (mode === "json") {
          return await fileResponse.json();
        }

        if (mode === "blob") {
          return await fileResponse.blob();
        }
      }

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
