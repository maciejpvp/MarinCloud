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
      <div className="flex flex-col h-full justify-center items-center">
        <h1 className="text-xl font-semibold text-default-800">
          Looks a bit empty here
        </h1>
        <p className="text-md text-default-600">
          Upload a file to get started.
        </p>
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
