import { FileIcon, defaultStyles } from "react-file-icon";

import { FileItemPopOver } from "./FileItemPopOver";

import { FileType } from "@/types";
import { getExtension } from "@/utils/utils";

type FileItemProps = {
  file: FileType;
};

export const FileItem = ({ file }: FileItemProps) => {
  const { fileName, isFolder, parentPath, userId, uuid } = file;

  let extension: string = "";

  if (!isFolder) {
    extension = getExtension(fileName);
  }

  return (
    <div className="flex flex-row h-10 gap-2  items-center">
      <div className="size-8">
        <FileIcon
          extension={extension}
          {...defaultStyles[extension as keyof typeof defaultStyles]}
        />
      </div>
      <p className="text-lg font-semibold">{file.fileName}</p>
      <FileItemPopOver />
    </div>
  );
};
