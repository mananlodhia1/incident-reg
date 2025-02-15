import { CustomFlowbiteTheme, Select, useThemeMode } from "flowbite-react";
import CustomLabel from "./customLabel";

type option = {
  title: string;
  value: string;
};

interface SelectProps {
  id: string;
  required: boolean;
  labelText: string;
  labelId: string;
  helperText: string;
  options: option[];
  defaultValue: string;
  onChange: (data: any) => void;
}

export default function CustomSelect({
  id,
  required,
  labelText,
  labelId,
  options,
  helperText,
  defaultValue,
  onChange,
}: Partial<SelectProps>): JSX.Element {
  const { mode } = useThemeMode();
  const customTheme: CustomFlowbiteTheme["select"] = {
    field: {
      select: {
        base: "!text-base font-normal relative w-full h-[52px]",
        colors: {
          light:
            "bg-white text-fiord-700 !rounded-[8px] border-fiord-300 hover:border-fiord-400 hover:bg-fiord-50 !ring-0 focus:!border-chateauGreen-600",
          dark: "bg-fiord-900 text-fiord-300 border-white !rounded-[4px]",
        },
      },
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
      <Select
        theme={customTheme}
        color={mode === "light" ? "light" : "dark"}
        id={id}
        required={required}
        onChange={onChange}
        value={defaultValue}
      >
        <option value="DEFAULT">Select an option ...</option>

        {options &&
          options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.title}
            </option>
          ))}
      </Select>
    </div>
  );
}
