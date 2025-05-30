import { useCreateFolder } from "@/hooks/useCreateFolder";
import { FileItem } from "./FileItem";

import { FileType } from "@/types";

type ListProps = {
  files: FileType[];
};

export const FilesList = ({ files }: ListProps) => {
  const { mutate: createFolder } = useCreateFolder();

  return (
    <>
      <ul>
        {files.map((file) => (
          <li key={file.uuid}>
            <FileItem file={file} />
          </li>
        ))}
      </ul>
      <button onClick={createFolder}>Create Folder</button>
    </>
  );
};
