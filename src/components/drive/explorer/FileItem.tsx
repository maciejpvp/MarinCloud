import { FileIcon, defaultStyles } from "react-file-icon";

import { FileItemPopOver } from "./FileItemPopOver";

import { FileType } from "@/types";
import { getExtension } from "@/utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

type FileItemProps = {
  file: FileType;
};

export const FileItem = ({ file }: FileItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fileName, isFolder, parentPath, userId, uuid } = file;

  let extension: string = "";

  const handleFolder = () => {
    const basePath = location.pathname.replace(/^\/drive\/?/, "");

    const newPath = `/drive/${basePath ? basePath + "/" : ""}${fileName}`;

    navigate(newPath);
  };

  if (!isFolder) {
    extension = getExtension(fileName);
  }

  return (
    <>
      {isFolder ? (
        <button
          className="flex flex-row h-10 gap-2  items-center"
          onClick={handleFolder}
        >
          <div className="size-8">
            <FileIcon
              extension={extension}
              {...defaultStyles[extension as keyof typeof defaultStyles]}
            />
          </div>
          <p className="text-lg font-semibold">{file.fileName}</p>
        </button>
      ) : (
        <div className="flex flex-row h-10 gap-2  items-center">
          <div className="size-8">
            <FileIcon
              extension={extension}
              {...defaultStyles[extension as keyof typeof defaultStyles]}
            />
          </div>
          <p className="text-lg font-semibold">{file.fileName}</p>
          <FileItemPopOver filename={fileName} uuid={uuid} />
        </div>
      )}
    </>
  );
};
