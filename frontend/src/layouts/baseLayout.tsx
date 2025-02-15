import { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
  id?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, id }) => {
  return (
    <div className="container w-full h-screen mx-auto" id={id}>
      <div className="flex h-full items-center justify-center max-w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-5">
        {children}
      </div>
    </div>
  );
};
