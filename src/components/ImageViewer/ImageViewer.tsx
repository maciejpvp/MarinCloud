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

import { useDownloadFile } from "@/hooks/useDownloadFile";
import { useImageViewerStore } from "@/store/imageViewerStore";

export const ImageViewer = () => {
  const isOpen = useImageViewerStore((store) => store.isOpen);
  const close = useImageViewerStore((store) => store.close);
  const filename = useImageViewerStore((store) => store.filename);
  const uuid = useImageViewerStore((store) => store.uuid);

  const { downloadFile } = useDownloadFile(uuid, filename);

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      setImageUrl(undefined);
      const file = await downloadFile("blob");

      if (file instanceof Blob) {
        const objectUrl = URL.createObjectURL(file);

        setImageUrl(objectUrl);
      } else {
        setImageUrl("");
      }
    })();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      size="5xl"
      onOpenChange={(open) => {
        if (!open) {
          close();
          setImageUrl(undefined);
        }
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-content1-foreground">
              Viewing {`"${filename}"`}
            </ModalHeader>

            <ModalBody>
              {imageUrl === undefined ? (
                <div className="flex flex-col items-center justify-center h-[70vh]">
                  <Spinner size="lg">
                    <span className="text-content3 text-sm">Loading...</span>
                  </Spinner>
                </div>
              ) : imageUrl === "" ? (
                <div className="flex items-center justify-center h-[70vh] text-content3">
                  Failed to load image
                </div>
              ) : (
                <div className="flex items-center justify-center h-[70vh]">
                  <img
                    alt={filename}
                    className="max-h-full max-w-full rounded-lg shadow-md"
                    src={imageUrl}
                  />
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  setImageUrl(undefined);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
