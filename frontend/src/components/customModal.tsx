import { ReactNode, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useHandleModal } from "../hooks/useHandleModal";

interface CustomModalProps {
  children: ReactNode;
  modalRef: React.RefObject<() => void | null>;
  openRef: React.RefObject<() => void | null>;
  modalTrigger: ReactNode;
}

export default function CustomModal({
  modalRef,
  openRef,
  children,
  modalTrigger,
}: Partial<CustomModalProps>): JSX.Element {
  const { isOpen, closeModal, openModal } = useHandleModal(false);

  useEffect(() => {
    if (modalRef) {
      (modalRef.current as any) = closeModal;
      if (openRef) {
        (openRef.current as any) = openModal;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef?.current, openRef]);

  return (
    <>
      {modalTrigger}
      <Dialog
        open={isOpen}
        as="div"
        className="fixed inset-0 flex w-screen items-center justify-center bg-white bg-opacity-40 backdrop-blur-[2px] transition duration-300 ease-out data-[closed]:opacity-0"
        onClose={() => {}}
        transition
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md border rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
