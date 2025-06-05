import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircularProgress } from "@heroui/progress";

import { useUploadFile } from "@/hooks/useUploadFile";

export const UploadForm = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { mutate: uploadFile } = useUploadFile(setUploading, setUploadProgress);
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
          setUploadProgress(percent);
        },
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      setUploading(true);
      setFilename(file.name);

      uploadFile({
        file,
        onProgress: (percent) => {
          setUploadProgress(percent);
        },
      });
    }
  };

  return (
    <div className="" onDragEnter={handleDrag}>
      {/* Upload Button */}
      {/* <button */}
      {/*   className="fixed bottom-4 right-10 z-50 bg-primary hover:bg-primary-600 hover:scale-[102%] transition-all duration-200  text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg" */}
      {/*   id="uploadButton" */}
      {/*   onClick={() => inputRef.current?.click()} */}
      {/* > */}
      {/*   + */}
      {/* </button> */}
      <button
        className={`fixed bottom-3 right-4 z-50 bg-primary hover:bg-primary-600 hover:scale-[102%] transition-all duration-200 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg ${uploading ? "w-[250px] h-[60px] text-sm" : ""}`}
        id="uploadButton"
        onClick={() => {
          if (uploading) return;

          inputRef.current?.click();
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          {uploading ? (
            <motion.span
              key="uploading"
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              initial={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-[auto,1fr] w-[250px] place-items-center">
                <CircularProgress
                  aria-label="Loading..."
                  className="  left-0 pl-2 top-0 h-[60px] w-[60px]"
                  color="success"
                  showValueLabel={true}
                  size="lg"
                  value={uploadProgress}
                />
                <div className="max-w-[190px] flex flex-col ">
                  <h1 className="truncate text-ellipsis overflow-hidden whitespace-nowrap text-base font-medium text-primary-100">
                    {filename}
                  </h1>
                  <p className="text-sm text-primary-200">
                    File being uploaded...
                  </p>
                </div>
              </div>
            </motion.span>
          ) : (
            <motion.span
              key="plus"
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.1 }}
            >
              +
            </motion.span>
          )}
        </AnimatePresence>
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
