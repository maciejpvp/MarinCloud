import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { createFolderModalStore } from "@/store/createFolderModalStore";
import { useCreateFolder } from "@/hooks/useCreateFolder";

export const CreateFileModal = () => {
  const { mutate: createFolder } = useCreateFolder();
  const isOpen = createFolderModalStore((store) => store.isOpen);
  const onOpenChange = createFolderModalStore((store) => store.toggle);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    onOpenChange();
    createFolder(name);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Create Folder
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="name"
                    required
                    label="Folder Name"
                    placeholder="New Folder"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
