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
      console.log("Dropped files:", files);
      uploadFile(files[0]);
      // Handle your file upload here
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      console.log("Selected files:", files);
      uploadFile(files[0]);
      // Handle your file upload here
    }
  };

  return (
    <div className="relative w-full h-screen" onDragEnter={handleDrag}>
      {/* Upload Button */}
      <button
        className="fixed bottom-4 right-10 z-50 bg-blue-500 hover:bg-blue-600 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
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
