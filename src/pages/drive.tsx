import { useState, useRef, useEffect } from "react";

import { FilesList } from "@/components/drive/explorer/FilesList";
import { LeftPanel } from "@/components/drive/explorer/LeftPanel";
import { UploadForm } from "@/components/drive/upload/uploadForm";
import { useGetFiles } from "@/hooks/useGetFiles";
import DefaultLayout from "@/layouts/default";

export function IndexPage() {
  const { data: files, isLoading } = useGetFiles();

  const [leftWidth, setLeftWidth] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = (offsetX / rect.width) * 100;
      const clamped = Math.max(15, Math.min(30, percent));

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

  if (isLoading) {
    return (
      <DefaultLayout>
        <p>Loading...</p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div ref={containerRef} className="flex h-full relative flex-row gap-1">
        {/* Left Panel */}
        <div className="h-full" style={{ width: `${leftWidth}%` }}>
          <LeftPanel />
        </div>

        {/* Resizer Handle */}
        <button
          className="w-1 cursor-col-resize bg-content1  transition-colors"
          onMouseDown={() => (isResizing.current = true)}
        />

        <div className="flex-1  h-full">
          <FilesList files={files ? files.files : []} />
        </div>
      </div>

      {/* Upload form overlay */}
      <UploadForm />
    </DefaultLayout>
  );
}
