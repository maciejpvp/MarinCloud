import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";

import { FileItem } from "./FileItem";

import { FileType } from "@/types";
import { useCheckboxStore } from "@/store/checkboxStore";
import { useDeleteFile } from "@/hooks/useDeleteFile";
import { useDeleteFolder } from "@/hooks/useDeleteFolder";
import { useDeleteConfirmModalStore } from "@/store/deleteConfirmModalStore";

type ListProps = {
  files: FileType[];
  isLoading: boolean;
};

export const FilesList = ({ files, isLoading }: ListProps) => {
  const { mutate: deleteFile } = useDeleteFile();
  const { mutate: deleteFolder } = useDeleteFolder();
  const filesUuids = useCheckboxStore((store) => store.activeFilesCheckboxes);
  const foldersUuids = useCheckboxStore(
    (store) => store.activeFoldersCheckboxes,
  );
  const restoreDefault = useCheckboxStore((store) => store.restoreDefault);

  const setCallback = useDeleteConfirmModalStore((store) => store.setCallback);
  const open = useDeleteConfirmModalStore((store) => store.open);

  const isDisabled: boolean = !(
    filesUuids.length > 0 || foldersUuids.length > 0
  );

  const deleteFiles = () => {
    if (filesUuids.length !== 0) {
      deleteFile(filesUuids);
      restoreDefault();
    }
    if (foldersUuids.length !== 0) {
      deleteFolder(foldersUuids);
      restoreDefault();
    }
  };

  const handleClick = () => {
    setCallback(deleteFiles);
    open();
  };

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
      <div className="flex justify-end">
        <Button
          className={`${isDisabled ? "bg-content2 opacity-50  pointer-events-none" : "bg-danger-300 opacity-100 pointer-events-auto cursor-pointer"}`}
          isDisabled={isDisabled}
          size="md"
          onPress={handleClick}
        >
          <span className="font-[600]">Delete</span>
        </Button>
      </div>
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
