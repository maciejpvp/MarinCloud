import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FileType = {
  fileName: string;
  isFolder: boolean;
  parentPath: string;
  userId: string;
  uuid: string;
};
