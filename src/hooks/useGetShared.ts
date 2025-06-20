import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

const fetchData = async () => {
  const response = await axiosInstance.get("/get-shared-files");

  return response.data.items;
};

export const useGetShared = () => {
  return useQuery({
    queryKey: [`sharedFiles`],
    queryFn: fetchData,
    staleTime: 10 * 60 * 1000, //10 min
  });
};
