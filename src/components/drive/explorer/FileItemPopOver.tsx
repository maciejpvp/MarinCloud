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
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import { Bars } from "@/components/icons";
import { useDownloadFile } from "@/hooks/useDownloadFile";
import { useDeleteFile } from "@/hooks/useDeleteFile";
import { useDeleteFolder } from "@/hooks/useDeleteFolder";
import { useDeleteConfirmModalStore } from "@/store/deleteConfirmModalStore";
import { useShareFileModalStore } from "@/store/shareFileModalStore";
import { useTextEditorModalStore } from "@/store/textEditorModalStore";

type FileItemPopOverProps = {
  uuid: string;
  filename: string;
  extension?: string;
  disableButton?: string[];
  isFolder?: boolean;
  isOptimistic?: boolean;
  sharedTo?: string[];
};

export const FileItemPopOver = ({
  uuid,
  filename,
  extension,
  disableButton = [],
  isFolder = false,
  isOptimistic = false,
  sharedTo = [],
}: FileItemPopOverProps) => {
  const { downloadFile } = useDownloadFile(uuid, filename);
  const { mutate: deleteFile } = useDeleteFile();
  const { mutate: deleteFolder } = useDeleteFolder();

  const setCallback = useDeleteConfirmModalStore((store) => store.setCallback);
  const openDeleteModal = useDeleteConfirmModalStore((store) => store.open);
  const openShareModal = useShareFileModalStore((store) => store.open);
  const openTextEditor = useTextEditorModalStore((store) => store.open);

  const handleDelete = () => {
    if (isFolder) {
      setCallback(() => deleteFolder([uuid]));
    } else {
      setCallback(() => deleteFile([uuid]));
    }

    openDeleteModal();
  };

  const handleOpenShareModal = () => {
    openShareModal({ uuid, filename, emails: [...sharedTo] });
  };

  const handleOpenInTextEditor = async () => {
    openTextEditor(filename, uuid);
  };

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
      onClick: handleOpenShareModal,
    },
    {
      key: "edit",
      label: "Rename",
      description: "Change file name",
      icon: withIconSize(PencilIcon),
    },
  ];

  if (extension === "txt") {
    dropdownActions.push({
      key: "textEditor",
      label: "Open in Text Editor",
      description: "Edit text file directly",
      icon: withIconSize(DocumentTextIcon),
      onClick: handleOpenInTextEditor,
    });
  }

  const dangerActions = [
    {
      key: "delete",
      label: "Delete",
      description: "Permanently delete the file",
      icon: withIconSize(TrashIcon),
      className: "text-danger",
      onClick: handleDelete,
    },
  ];

  const enabledDangerActions = dangerActions.filter(
    ({ key }) => !disableButton.includes(key),
  );

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
                onClick={() => onClick?.()}
              >
                {label}
              </DropdownItem>
            ))}
        </DropdownSection>
        <DropdownSection
          title={enabledDangerActions.length === 0 ? "" : "Danger zone"}
        >
          {enabledDangerActions.map(
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
