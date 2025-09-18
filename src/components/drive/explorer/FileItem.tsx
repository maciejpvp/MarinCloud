import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "@heroui/checkbox";
import { FileIcon, defaultStyles } from "react-file-icon";

import { FileItemPopOver } from "./FileItemPopOver";

import { FileType } from "@/types";
import { getExtension } from "@/utils/utils";
import { useCheckboxStore } from "@/store/checkboxStore";

type FileItemProps = {
  file: FileType;
};

export const FileItem = ({ file }: FileItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pushCheckbox = useCheckboxStore((store) => store.pushCheckbox);
  const removeCheckbox = useCheckboxStore((store) => store.removeCheckbox);

  const { fileName, isFolder, uuid, isOptimistic, sharedTo } = file;
  const pathStartsWith = location.pathname.split("/").at(1);

  let extension: string = "";

  const handleFolder = () => {
    if (isOptimistic) return;
    const basePath = location.pathname.replace(/^\/drive\/?/, "");

    const newPath = `/drive/${basePath ? basePath + "/" : ""}${fileName}`;

    navigate(newPath);
  };

  if (!isFolder) {
    extension = getExtension(fileName);
  }

  const onValueChange = (state: boolean) => {
    if (state) {
      pushCheckbox(uuid, isFolder);
    } else {
      removeCheckbox(uuid, isFolder);
    }
  };

  return (
    <>
      {isFolder ? (
        <div
          className={`flex flex-row gap-2 items-center justify-start transition-all duration-100 ${isOptimistic ? "opacity-40" : ""}`}
        >
          <Checkbox onValueChange={onValueChange} />
          <button
            className="flex flex-row h-10 gap-2 items-center transition-transform duration-200 hover:translate-x-2"
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
          <FileItemPopOver
            disableButton={["share", "download"]}
            filename={fileName}
            isFolder={true}
            isOptimistic={isOptimistic}
            sharedTo={sharedTo}
            uuid={uuid}
          />
        </div>
      ) : (
        <div
          className={`flex flex-row h-10 gap-2  items-center transition-transform duration-200 hover:translate-x-2 ${isOptimistic ? "opacity-40" : ""}`}
        >
          <Checkbox onValueChange={onValueChange} />
          <div className="size-8">
            <FileIcon
              extension={extension}
              {...defaultStyles[extension as keyof typeof defaultStyles]}
            />
          </div>
          <p className="text-lg font-semibold">{file.fileName}</p>
          <FileItemPopOver
            disableButton={
              pathStartsWith === "drive" ? [] : ["share", "edit", "delete"]
            }
            extension={extension}
            filename={fileName}
            isOptimistic={isOptimistic}
            sharedTo={sharedTo}
            uuid={uuid}
          />
        </div>
      )}
    </>
  );
};
