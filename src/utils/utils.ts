export const getExtension = (fileName: string): string => {
  const extension = fileName.split(".").pop();

  return extension ? extension : "";
};
