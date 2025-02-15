"use client";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

export interface FormValue {
  [key: string]: string | number | boolean 
}

interface ReturnObject {
  formValue: FormValue;
  setFormValue: Dispatch<SetStateAction<FormValue>>;
  handleFieldChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function useHandleChange(initialValue: FormValue): ReturnObject {
  const [formValue, setFormValue] = useState<FormValue>(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const targetValue: string | number | boolean = e.target.value;
    setFormValue({ ...formValue, [e.target.id]: targetValue });
  };

  return {
    formValue,
    setFormValue,
    handleFieldChange: handleChange,
  };
}
