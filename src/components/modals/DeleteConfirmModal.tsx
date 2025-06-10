import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { useDeleteConfirmModalStore } from "@/store/deleteConfirmModalStore";

export const DeleteConfirmModal = () => {
  const isOpen = useDeleteConfirmModalStore((store) => store.isOpen);
  const close = useDeleteConfirmModalStore((store) => store.close);
  const callback = useDeleteConfirmModalStore((store) => store.callback);

  const handleDelete = () => {
    callback();
    close();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={close}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-large font-semibold text-danger">
                  Confirm Delete
                </h3>
                <p className="text-sm text-default-500">
                  Are you sure you want to delete this?
                </p>
              </ModalHeader>

              <ModalBody>
                <p className="text-sm text-default-500">
                  Deletion is <span className="font-semibold">permanent</span>{" "}
                  and cannot be undone.
                </p>
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
