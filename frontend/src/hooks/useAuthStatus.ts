import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export function useAuthStatus() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading_A, setIsLoading] = useState(true);
  const token = Cookies.get("tkn_valid");

  useEffect(() => {
    if (token) setIsValid(true);
    setIsLoading(false);
  }, [token]);

  return { isValid, isLoading_A };
}
