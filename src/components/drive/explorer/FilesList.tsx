import { FileItem } from "./FileItem";

import { FileType } from "@/types";

type ListProps = {
  files: FileType[];
};

export const FilesList = ({ files }: ListProps) => {
  return (
    <ul>
      {files.map((file) => (
        <li key={file.uuid}>
          <FileItem file={file} />
        </li>
      ))}
    </ul>
  );
};
