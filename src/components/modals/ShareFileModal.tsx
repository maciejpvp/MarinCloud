import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { useShareFileModalStore } from "@/store/shareFileModalStore";
import { useShareFile } from "@/hooks/useShareFile";
import { useUnshareFile } from "@/hooks/useUnshareFile";

export const ShareFileModal = () => {
  const isOpen = useShareFileModalStore((store) => store.isOpen);
  const close = useShareFileModalStore((store) => store.close);
  const data = useShareFileModalStore((store) => store.data);
  const { shareFile } = useShareFile(data?.uuid ? data.uuid : "invalid");
  const { unShareFile } = useUnshareFile(data?.uuid ? data.uuid : "invalid");

  const handleShare = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = (formData.get("email") as string) ?? "";

    shareFile(email);
  };

  const handleRemove = (index: number, email: string) => {
    unShareFile(index, email);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={close}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleShare}>
                <ModalHeader className="flex flex-col gap-1">
                  Share {`"${data?.filename}"`}
                </ModalHeader>

                <ModalBody className="space-y-4">
                  <Input
                    isRequired
                    required
                    label="Email Address"
                    name="email"
                  />

                  {data?.emails.length !== 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Shared with:</p>
                      <ul className="space-y-2">
                        {data?.emails.map((email, index) => (
                          <li
                            key={email}
                            className="flex justify-between items-center bg-default-100 rounded-lg px-3 py-2"
                          >
                            <span className="text-sm text-default-800">
                              {email}
                            </span>
                            <Button
                              color="danger"
                              size="sm"
                              variant="light"
                              onPress={() => handleRemove(index, email)}
                            >
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Share
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
