import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

const fetchData = async () => {
  const response = await axiosInstance.post("/get-files");

  return response.data;
};

export const useGetFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: fetchData,
  });
};
