import { CustomFlowbiteTheme, Label, useThemeMode } from "flowbite-react";

interface LabelProps {
  id: string;
  text: string;
  disabled: boolean;
}

export default function CustomLabel({
  id,
  text,
  disabled,
}: Partial<LabelProps>): JSX.Element {
  const { mode } = useThemeMode();
  const customTheme: CustomFlowbiteTheme["label"] = {
    root: {
      base: "font-normal text-sm font-semibold",
      colors: {
        light: "text-fiord-900",
        dark: "text-white",
      },
    },
  };

  return (
    <Label
      htmlFor={id}
      value={text}
      disabled={disabled}
      theme={customTheme}
      color={mode === "light" ? "light" : "dark"}
    />
  );
}
