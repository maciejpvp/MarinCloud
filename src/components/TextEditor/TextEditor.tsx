import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { useTextEditorModalStore } from "@/store/textEditorModalStore";
import { useDownloadFile } from "@/hooks/useDownloadFile";
import { useUploadFile } from "@/hooks/useUploadFile";

export const TextEditorModal = () => {
  const isOpen = useTextEditorModalStore((store) => store.isOpen);
  const close = useTextEditorModalStore((store) => store.close);
  const filename = useTextEditorModalStore((store) => store.filename);
  const uuid = useTextEditorModalStore((store) => store.uuid);
  const { downloadFile } = useDownloadFile(uuid, filename);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFileMutation = useUploadFile(setUploading, setUploadProgress);

  const [value, setValue] = useState<string | undefined>(undefined);

  const handleSave = () => {
    if (!value) {
      close();
      setValue(undefined);

      return;
    }

    const textBlob = new Blob([value], { type: "text/plain" });
    const file = new File([textBlob], filename, { type: "text/plain" });

    setUploading(true);

    uploadFileMutation.mutate(
      {
        file,
        uuid,
        onProgress: (progress) => setUploadProgress(progress),
      },
      {
        onSuccess: () => {
          close();
          setValue(undefined);
        },
        onError: () => {
          setUploadProgress(0);
        },
      },
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      setValue(undefined);
      const file = await downloadFile("text");

      if (typeof file === "string" && file.length > 0) {
        setValue(file);
      } else {
        setValue("");
      }
    })();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      size="4xl"
      onOpenChange={(open) => {
        if (!open) {
          close();
          setValue(undefined);
        }
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editing {`"${filename}"`}
            </ModalHeader>

            <ModalBody>
              {value === undefined ? (
                <div className="flex items-center justify-center h-[60vh]">
                  <span className="text-gray-500">Loading...</span>
                </div>
              ) : (
                <textarea
                  className="w-full h-[60vh] resize-none rounded-lg border border-gray-300 shadow-md 
                             bg-white text-gray-800 p-4 font-mono text-base leading-relaxed 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading}
                  placeholder="Start typing..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                isDisabled={uploading}
                variant="light"
                onPress={() => {
                  onClose();
                  setValue(undefined);
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={uploading}
                onPress={handleSave}
              >
                {uploading ? `Uploading... ${uploadProgress}` : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
