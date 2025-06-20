import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

const fetchData = async (path: string) => {
  const response = await axiosInstance.post("/get-files", {
    path: `${path ? path : ""}`,
  });

  return response.data.files;
};

export const useGetFiles = (path: string, shouldFetch: boolean = true) => {
  return useQuery({
    queryKey: [`files/${path}`],
    queryFn: () => fetchData(path),
    staleTime: 10 * 60 * 1000, //10 min
    enabled: shouldFetch,
  });
};
