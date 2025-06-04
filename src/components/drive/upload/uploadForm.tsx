import React, { useState, useRef } from "react";

import { useUploadFile } from "@/hooks/useUploadFile";

export const UploadForm = () => {
  const { mutate: uploadFile } = useUploadFile();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      const file = files[0];

      uploadFile({
        file,
        onProgress: (percent) => {
          console.log(`Upload progress: ${percent}%`);
        },
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      uploadFile({
        file,
        onProgress: (percent) => {
          console.log(`Upload progress: ${percent}%`);
        },
      });
    }
  };

  return (
    <div className="" onDragEnter={handleDrag}>
      {/* Upload Button */}
      <button
        className="fixed bottom-4 right-10 z-50 bg-primary hover:bg-primary-600 hover:scale-[102%] transition-all duration-200  text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        id="uploadButton"
        onClick={() => inputRef.current?.click()}
      >
        +
      </button>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        multiple
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />

      {/* Drag Overlay */}
      {dragActive && (
        <div
          className="fixed inset-0 z-40 bg-background bg-opacity-40 flex items-center justify-center text-foreground text-xl font-semibold transition-all duration-500"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          Drag a File to Upload
        </div>
      )}
    </div>
  );
};
