import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { contextMenuStore } from "@/store/contextMenuStore";
import { createFolderModalStore } from "@/store/createFolderModalStore";

export const RightContextMenu = () => {
  const pos = contextMenuStore((store) => store.pos);
  const openFolderModel = createFolderModalStore((store) => store.toggle);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button
            id="rightContextTrigger"
            style={{
              opacity: 0,
              pointerEvents: "none",
              position: "absolute",
              left: pos[0],
              top: pos[1],
            }}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="new"
            onClick={() => {
              document.getElementById("uploadButton")?.click();
            }}
          >
            Upload File
          </DropdownItem>
          <DropdownItem key="copy" onClick={openFolderModel}>
            Create Folder
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
