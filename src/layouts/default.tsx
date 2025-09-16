import { useEffect, useRef, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

import { LeftPanel } from "@/components/drive/explorer/LeftPanel";
import { Navbar } from "@/components/drive/explorer/Navbar";
import { useLeftPanelStore } from "@/store/leftPanelStore";

const CreateFileModal = lazy(() =>
  import("@/components/modals/CreateFolderModal").then((m) => ({
    default: m.CreateFileModal,
  })),
);
const DeleteConfirmModal = lazy(() =>
  import("@/components/modals/DeleteConfirmModal").then((m) => ({
    default: m.DeleteConfirmModal,
  })),
);
const ShareFileModal = lazy(() =>
  import("@/components/modals/ShareFileModal").then((m) => ({
    default: m.ShareFileModal,
  })),
);
const TextEditorModal = lazy(() =>
  import("@/components/TextEditor/TextEditor").then((m) => ({
    default: m.TextEditorModal,
  })),
);

export default function DefaultLayout({
  children,
  showNavbar = true,
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
}) {
  const location = useLocation();
  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const leftWidth = useLeftPanelStore((state) => state.leftWidth);
  const setLeftWidth = useLeftPanelStore((state) => state.setLeftWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const clamped = Math.max(200, Math.min(500, offsetX));

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
  }, [setLeftWidth]);

  return (
    <div className="relative flex flex-col h-screen">
      <main className="container px-3 flex-grow pt-16">
        <div className="flex flex-col gap-4 w-max h-[calc(100dvh-80px)]">
          {showNavbar ? (
            <Navbar path={pathAfterDrive} />
          ) : (
            <div style={{ width: "calc(100dvw - 50px)" }} />
          )}
          <div
            ref={containerRef}
            className="flex h-full relative flex-row gap-1"
          >
            <div className="h-full" style={{ width: `${leftWidth}px` }}>
              <LeftPanel />
            </div>
            <button
              className="w-1 cursor-col-resize bg-content1 transition-colors"
              onMouseDown={() => (isResizing.current = true)}
            />
            <div className="flex-1 px-1 h-full">{children}</div>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <CreateFileModal />
        <DeleteConfirmModal />
        <ShareFileModal />
        <TextEditorModal />
      </Suspense>
    </div>
  );
}
