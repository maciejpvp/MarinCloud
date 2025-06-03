import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import {
  ArrowDownTrayIcon,
  UserPlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

import { Bars } from "@/components/icons";
import { useDownloadFile } from "@/hooks/useDownloadFile";
import { useDeleteFile } from "@/hooks/useDeleteFile";

type FileItemPopOverProps = {
  uuid: string;
  filename: string;
};

export const FileItemPopOver = ({ uuid, filename }: FileItemPopOverProps) => {
  const { downloadFile } = useDownloadFile(uuid, filename);
  const { mutate: deleteFile } = useDeleteFile();

  return (
    <Dropdown showArrow placement="bottom">
      <DropdownTrigger>
        <button>
          <Bars />
        </button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection showDivider title="Actions">
          <DropdownItem
            key="download"
            description="Download a file"
            startContent={<ArrowDownTrayIcon className="size-10" />}
            onClick={downloadFile}
          >
            download
          </DropdownItem>
          <DropdownItem
            key="share"
            description="Share file to friends"
            startContent={<UserPlusIcon className="size-10" />}
          >
            Share File
          </DropdownItem>
          <DropdownItem
            key="edit"
            description="Change file name"
            startContent={<PencilIcon className="size-10" />}
          >
            Rename
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            description="Permanently delete the file"
            startContent={<TrashIcon className="size-10" />}
            onClick={() => deleteFile(uuid)}
          >
            Delete
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
