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
import { useDeleteFolder } from "@/hooks/useDeleteFolder";

type FileItemPopOverProps = {
  uuid: string;
  filename: string;
  disableButton?: string[];
  isFolder?: boolean;
  isOptimistic?: boolean;
};

export const FileItemPopOver = ({
  uuid,
  filename,
  disableButton = [],
  isFolder = false,
  isOptimistic = false,
}: FileItemPopOverProps) => {
  const { downloadFile } = useDownloadFile(uuid, filename);
  const { mutate: deleteFile } = useDeleteFile();
  const { mutate: deleteFolder } = useDeleteFolder();

  const withIconSize = (Icon: React.ElementType) => (
    <Icon className="size-10" />
  );

  const dropdownActions = [
    {
      key: "download",
      label: "Download",
      description: "Download a file",
      icon: withIconSize(ArrowDownTrayIcon),
      onClick: downloadFile,
    },
    {
      key: "share",
      label: "Share File",
      description: "Share file to friends",
      icon: withIconSize(UserPlusIcon),
    },
    {
      key: "edit",
      label: "Rename",
      description: "Change file name",
      icon: withIconSize(PencilIcon),
    },
  ];

  const dangerActions = [
    {
      key: "delete",
      label: "Delete",
      description: "Permanently delete the file",
      icon: withIconSize(TrashIcon),
      className: "text-danger",
      onClick: () => {
        isFolder ? deleteFolder(uuid) : deleteFile(uuid);
      },
    },
  ];

  return (
    <Dropdown showArrow isDisabled={isOptimistic} placement="bottom">
      <DropdownTrigger>
        <button>
          <Bars />
        </button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection showDivider title="Actions">
          {dropdownActions
            .filter(({ key }) => !disableButton.includes(key))
            .map(({ key, label, description, icon, onClick }) => (
              <DropdownItem
                key={key}
                description={description}
                startContent={icon}
                onClick={onClick}
              >
                {label}
              </DropdownItem>
            ))}
        </DropdownSection>
        <DropdownSection title="Danger zone">
          {dangerActions.map(
            ({ key, label, description, icon, className, onClick }) => (
              <DropdownItem
                key={key}
                className={className}
                description={description}
                startContent={icon}
                onClick={onClick}
              >
                {label}
              </DropdownItem>
            ),
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
