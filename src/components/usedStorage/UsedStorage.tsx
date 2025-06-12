import { useMemo } from "react";
import { Progress } from "@heroui/progress";
import { Skeleton } from "@heroui/skeleton";

import { useGetUsedStorage } from "@/hooks/useGetUsedStorage";
import { formatBytes, getDiskUsagePercentage } from "@/utils/utils";

export const UsedStorage = () => {
  const { data: usedSpace, isLoading } = useGetUsedStorage();

  const percent: number = useMemo(
    () => getDiskUsagePercentage(usedSpace),
    [usedSpace],
  );

  const usedSpaceString = useMemo(() => formatBytes(usedSpace), [usedSpace]);

  return (
    <div className="space-y-1">
      <Progress
        className="max-w-md"
        label={`Storage (${isLoading ? 0 : percent.toFixed(0)}% full)`}
        value={isLoading ? 0 : percent}
      />
      <Skeleton className="h-4" isLoaded={!isLoading}>
        <p className="text-sm">{usedSpaceString} of 5GB used</p>
      </Skeleton>
    </div>
  );
};
