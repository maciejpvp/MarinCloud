export const getExtension = (fileName: string): string => {
  const extension = fileName.split(".").pop();

  return extension ? extension : "";
};

export const getDiskUsagePercentage = (usedBytes: number): number => {
  const limitBytes = 5 * 1024 * 1024 * 1024; // 5 GB
  const percentage = (usedBytes / limitBytes) * 100;

  return Math.min(Math.max(percentage, 0), 100);
};

export const formatBytes = (usedBytes: number, totalBytes?: number): string => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  const format = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);

    return `${value.toFixed(1)} ${units[i]}`;
  };

  const usedFormatted = format(usedBytes);

  if (totalBytes !== undefined) {
    const totalFormatted = format(totalBytes);

    return `${usedFormatted} of ${totalFormatted}`;
  }

  return usedFormatted;
};
