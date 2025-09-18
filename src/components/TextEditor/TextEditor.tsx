import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

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
            <ModalHeader className="flex flex-col gap-1 text-content1-foreground">
              Editing {`"${filename}"`}
            </ModalHeader>

            <ModalBody>
              {value === undefined ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                  <Spinner size="lg">
                    <span className="text-content3 text-sm">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <textarea
                  className="w-full h-[60vh] resize-none rounded-lg border border-gray-300 shadow-md 
                             bg-content2 text-content2-foreground p-4 font-mono text-base leading-relaxed 
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
