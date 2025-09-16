import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { useTextEditorModalStore } from "@/store/textEditorModalStore";

export const TextEditorModal = () => {
  const isOpen = useTextEditorModalStore((store) => store.isOpen);
  const close = useTextEditorModalStore((store) => store.close);
  const filename = useTextEditorModalStore((store) => store.filename);
  const value = useTextEditorModalStore((store) => store.value);
  const setValue = useTextEditorModalStore((store) => store.setValue);

  const handleSave = () => {
    close();
  };

  return (
    <Modal isOpen={isOpen} size="4xl" onOpenChange={close}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editing {`"${filename}"`}
            </ModalHeader>

            <ModalBody>
              <textarea
                className="w-full h-[60vh] resize-none rounded-lg border border-gray-300 shadow-md 
                           bg-white text-gray-800 p-4 font-mono text-base leading-relaxed 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Start typing..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
