import {
  CustomFlowbiteTheme,
  Textarea,
  TextInput,
  useThemeMode,
} from "flowbite-react";
import CustomLabel from "./customLabel";
import { ChangeEvent, ReactNode } from "react";

interface InputGroupProps {
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  helperText: string;
  labelText: string;
  labelId: string;
  value: string | number;
  helperTextBelow: ReactNode;
  isValid: boolean;
  rightIcon: () => JSX.Element;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  step?: string;
  disabled?: boolean
}

export default function CustomInputGroup({
  id,
  type,
  placeholder,
  required,
  helperText,
  labelText,
  labelId,
  value,
  step,
  helperTextBelow,
  isValid,
  onChange,
  rightIcon,
  isTextArea = false,
  disabled
}: Partial<InputGroupProps>): JSX.Element {
  const inputTypes = ["email"];
  const { mode } = useThemeMode();
  const customTheme: CustomFlowbiteTheme["textInput"] = {
    field: {
      input: {
        base: "block w-full border !rounded-lg border-fiord-300 focus:!border-2 focus:!border-fiord-300 !text-base h-[52px] focus:ring-0",
        colors: {
          light: `bg-white placeholder-fiord-500 text-fiord-900 hover:bg-fiord-50 focus:bg-white ${
            inputTypes?.includes(id as string) && value !== ""
              ? isValid
                ? "border-fiord-300 focus:!border-fiord-300"
                : "border-pastelLilac-600 focus:!border-pastelLilac-600"
              : ""
          }`,
          dark: "bg-fiord-900 placeholder-fiord-300 text-white",
        },
      },
    },
  };

  const customThemeTextArea: CustomFlowbiteTheme["textarea"] = {
    base: "block w-full border !rounded-lg border-fiord-300 !text-base focus:ring-2 focus:!ring-fiord-300 focus:border-fiord-300",
    colors: {
      light: `bg-white placeholder-fiord-500 text-fiord-900 hover:bg-fiord-50 focus:bg-white ${
        inputTypes?.includes(id as string) && value !== ""
          ? isValid
            ? "border-fiord-700 focus:!border-fiord-700"
            : "border-pastelLilac-600 focus:!border-pastelLilac-600"
          : ""
      }`,
      dark: "bg-fiord-900 placeholder-fiord-300 text-white",
    },
  };

  return (
    <div>
      <CustomLabel id={labelId} text={labelText} />
      {helperText !== "" && (
        <p className="font-normal text-xs italic text-fiord-700 mb-2 dark:text-white">
          {helperText}
        </p>
      )}

      {isTextArea ? (
        <Textarea
          theme={customThemeTextArea}
          color={mode === "light" ? "light" : "dark"}
          id={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          rows={4}
        />
      ) : (
        <TextInput
          theme={customTheme}
          color={mode === "light" ? "light" : "dark"}
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          step={step}
          onChange={onChange}
          rightIcon={rightIcon}
          disabled={disabled}
          helperText={
            <span className={`flex font-normal text-xs  mb-2 dark:text-white`}>
              {helperTextBelow}
            </span>
          }
        />
      )}
    </div>
  );
}
