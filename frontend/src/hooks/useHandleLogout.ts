import { useAppDispatch } from "../reduxLibrary/hooks";
import { logout } from "../services/actions/authActions";
import { useLoading } from "../hooks/useLoading";
import { useNavigate } from "react-router-dom";

export function useHandleLogout() {
  const dispatch = useAppDispatch();
  const { isLoading, setIsLoading } = useLoading();

  const navigate = useNavigate();

  const handleLogout = () => {
    const username = localStorage.username;

    dispatch(logout({ username: username }, navigate, setIsLoading));
  };

  return { handleLogout, isLoading };
}
