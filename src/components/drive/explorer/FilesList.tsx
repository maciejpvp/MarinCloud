import { Skeleton } from "@heroui/skeleton";
import { addToast } from "@heroui/toast";

import { FileItem } from "./FileItem";

import { FileType } from "@/types";

type ListProps = {
  files: FileType[];
  isLoading: boolean;
};

export const FilesList = ({ files, isLoading }: ListProps) => {
  if (isLoading) {
    return (
      <div>
        <ul className="flex flex-col gap-1">
          {[...Array(10)].map((_, index) => (
            <li key={index}>
              <Skeleton className="rounded-md w-60 h-10" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col">
        <h1>No Files Found</h1>
      </div>
    );
  }

  return (
    <div>
      <ul className="flex flex-col gap-1">
        {files.map((file) => (
          <li key={file.uuid}>
            <FileItem file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
};
