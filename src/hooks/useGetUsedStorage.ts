import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

const fetchData = async () => {
  const response = await axiosInstance.get("/get-storage");

  const usedSpace = response.data.usedSpace;

  //If user never uploaded anything backend returns "0" as a callback of no item with his userId
  if (usedSpace === "0") return 0;

  return usedSpace;
};

export const useGetUsedStorage = () => {
  return useQuery({
    queryKey: ["usedStorage"],
    queryFn: () => fetchData(),
    staleTime: 10 * 60 * 1000, //10 min
  });
};
