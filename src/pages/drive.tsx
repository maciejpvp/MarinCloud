import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FilesList } from "@/components/drive/explorer/FilesList";
import { LeftPanel } from "@/components/drive/explorer/LeftPanel";
import { UploadForm } from "@/components/drive/upload/uploadForm";
import { useGetFiles } from "@/hooks/useGetFiles";
import DefaultLayout from "@/layouts/default";
import { RightContextMenu } from "@/components/contextMenu/RightContextMenu";
import { contextMenuStore } from "@/store/contextMenuStore";
import { CreateFileModal } from "@/components/modals/CreateFolderModal";
import { Navbar } from "@/components/drive/explorer/Navbar";

export function IndexPage() {
  const openContext = contextMenuStore((state) => state.openContext);
  const location = useLocation();
  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";
  const { data: files, isLoading } = useGetFiles(pathAfterDrive);

  const [leftWidth, setLeftWidth] = useState(12);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = (offsetX / rect.width) * 100;
      const clamped = Math.max(10, Math.min(25, percent));

      setLeftWidth(clamped);
    };

    const stopResize = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 w-max h-[calc(100dvh-80px)]">
        <Navbar path={pathAfterDrive} />
        <div
          ref={containerRef}
          className="flex h-full relative flex-row gap-1"
          onContextMenu={(e) => {
            e.preventDefault();
            openContext([e.clientX, e.clientY]);
          }}
        >
          <div className="h-full" style={{ width: `${leftWidth}%` }}>
            <LeftPanel />
          </div>
          {/* Resizer Handle */}
          <button
            className="w-1 cursor-col-resize bg-content1  transition-colors"
            onMouseDown={() => (isResizing.current = true)}
          />
          <div className="flex-1  h-full">
            <FilesList files={files ? files : []} isLoading={isLoading} />
            {/* <button onClick={() => navigate("testFolder")}>test</button> */}
            <RightContextMenu />
          </div>
        </div>
      </div>

      {/* Overlay's */}
      <CreateFileModal />
      <UploadForm />
    </DefaultLayout>
  );
}
