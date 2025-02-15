import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface ReturnObject {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  openModal: Dispatch<SetStateAction<boolean>>;
}

export function useHandleModal(initialValue: boolean): ReturnObject {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    closeModal,
    openModal,
  };
}
