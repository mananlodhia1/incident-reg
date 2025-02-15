import { ReactNode } from "react";

interface AdminLayout {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayout> = ({ children }) => {
  return <div className="mx-5 py-5">{children}</div>;
};
