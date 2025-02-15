import { Button } from "flowbite-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  btnStyle?: string;
  type?: "button" | "submit" | "reset";
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  id: string;
  customStyle?: string;
}

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  btnStyle,
  handleClick,
  type,
  disabled,
  id,
  customStyle
}: Partial<ButtonProps>) => {
  const primaryStyle = "btn-primary";
  const secondaryStyle = "btn-secondary";

  return (
     <Button
      onClick={handleClick}
      id={id}
      className={`${
        btnStyle === "secondary" ? secondaryStyle : primaryStyle
      } w-max items-center p-0 ${customStyle}`}
      disabled={disabled}
      type={type}
    >
      <div
        className={`flex selection:${
          btnStyle === "secondary" && "flex flex-row-reverse"
        }`}
      >
        <span className="flex">{children}</span>
      </div>
    </Button>
  );
};
