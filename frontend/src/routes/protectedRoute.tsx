import Cookies from "js-cookie";
import { getAccessToken } from "../security/setToken";
import { useAppDispatch } from "../reduxLibrary/hooks";
import { Navigate } from "react-router-dom";
import AdminNavbar from "../components/adminNav";

interface ProtectedRouteProps {
  children: JSX.Element;
}
const isUserAuthenticated = () => {
  return Cookies.get("tkn_valid");
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = isUserAuthenticated();

  if (isAuthenticated) {
    getAccessToken(dispatch);
  }

  return isAuthenticated ? (
    <>
      <AdminNavbar />
      {children}
    </>
  ) : (
    <Navigate to="/" />
  );
};
