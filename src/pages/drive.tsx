import { useLocation } from "react-router-dom";

import { FilesList } from "@/components/drive/explorer/FilesList";
import { UploadForm } from "@/components/drive/upload/uploadForm";
import { useGetFiles } from "@/hooks/useGetFiles";
import DefaultLayout from "@/layouts/default";
import { RightContextMenu } from "@/components/contextMenu/RightContextMenu";
import { CreateFileModal } from "@/components/modals/CreateFolderModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

export function IndexPage() {
  const location = useLocation();
  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";
  const { data: files, isLoading } = useGetFiles(pathAfterDrive);

  return (
    <DefaultLayout>
      <FilesList files={files ? files : []} isLoading={isLoading} />
      <RightContextMenu />

      {/* Overlay's */}
      <CreateFileModal />
      <DeleteConfirmModal />
      <UploadForm />
    </DefaultLayout>
  );
}
