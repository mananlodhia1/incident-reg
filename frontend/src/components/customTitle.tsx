import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  customStyle?: string;
  size: "lg" | "sm";
}

export const CustomTitle: React.FC<TitleProps> = ({
  children,
  customStyle,
  size,
}) => {
  return size === "lg" ? (
    <h2
      className={`sm:text-5xl text-3xl font-bold tracking-tight ${customStyle}`}
    >
      {children}
    </h2>
  ) : size === "sm" ? (
    <h3 className={`text-base/7 font-semibold text-gray-900 ${customStyle}`}>{children}</h3>
  ) : (
    null
  );
};
