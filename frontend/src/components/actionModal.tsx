import React, { ReactElement, useRef } from "react";
import { DialogTitle } from "@headlessui/react";
import CustomModal from "./customModal";
import { Close } from "./icons";
import { CustomButton } from "./customBtn";

interface ModalProps {
  title: string;
  subtitle?: string;
  content: ReactElement;
  icon: ReactElement;
  btnStyle?: string;
}

export default function ActionModal({
  title,
  subtitle,
  content,
  icon,
  btnStyle,
}: ModalProps) {
  const modalRef = useRef<() => void | null>(null);
  const openRef = useRef<() => void | null>(null);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current();
    }
  };
  return (
    <CustomModal
      modalTrigger={
        <CustomButton
          type="submit"
          id="submit"
          btnStyle={btnStyle}
          disabled={false}
          handleClick={() => {
            if (openRef.current) {
              openRef.current();
            }
          }}
        >
          {icon}
        </CustomButton>
      }
      modalRef={modalRef}
      openRef={openRef}
    >
      <DialogTitle
        as="h3"
        className="flex text-base font-semibold leading-6 text-blackPearl-900 w-full items-center justify-between "
      >
        {title}
        <button onClick={handleClose}>
          <Close />
        </button>
      </DialogTitle>
      <div className="mt-7">
        <span className="text-sm font-normal text-blackPearl-900">
          {subtitle}
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-4 text-gray-500">
        {React.cloneElement(content, {
          closeModal: handleClose,
        })}
      </div>
    </CustomModal>
  );
}
