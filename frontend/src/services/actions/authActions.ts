import axios from "axios";
import { GET_ERRORS, GET_USER, SET_CURRENT_USER } from "../constants/types";
import { refreshToken, setToken } from "../../security/setToken";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, LoginRequest, LogoutRequest } from "../../models/apiModel";
import { SUCCESS } from "../constants/status";

const authAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  withCredentials: true,
});

export const login =
  (loginRequest: LoginRequest, navigate: any, setIsLoading: any, setError: any) =>
  async (dispatch: any) => {
    setIsLoading(true);
    try {
    const res =  await authAxios
      .post("/login", loginRequest, )
      if (Object.values(SUCCESS).includes(res.status)) {
       //extract token from data
       const accessToken = res.data.token.AccessToken;
       const idToken = res.data.token.IdToken;
       const refToken = res.data.token.RefreshToken;

       Cookies.set("tkn_valid", "valid", { sameSite: "strict" });
       //set token in header
       setToken(accessToken);
       //get data from response
       const decoded_token = jwtDecode<DecodedToken>(idToken);
       localStorage.setItem("username", decoded_token["cognito:username"]);
       localStorage.setItem("email", decoded_token.email);
       localStorage.setItem("ref_token", refToken);

       if (Object.values(SUCCESS).includes(res.status)) {
         setIsLoading(true);
         navigate("/admin/dashboard");
       }
       dispatch({
         type: GET_USER,
         payload: decoded_token,
       });

       dispatch({
         type: SET_CURRENT_USER,
         payload: decoded_token,
       });
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data);
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: {
          res: error.response?.data,
          status: error.response?.status,
        },
      });
    }

  };

export const logout =
  (logoutRequest: LogoutRequest, navigate: any, setIsLoading: any, setError?: any) =>
  async (dispatch: any) => {
    setIsLoading(true);
    try {
      const ref = await refreshToken(dispatch);
      setToken(ref.data.access);
      if (Object.values(SUCCESS).includes(ref.status)) {
        const res = await authAxios.post("/logout", logoutRequest);
        if (Object.values(SUCCESS).includes(res.status)) {
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("ref_token");
          Cookies.remove("tkn_valid");
          navigate("/admin");
          dispatch({
            type: SET_CURRENT_USER,
            payload: null,
          });
          dispatch({
            type: GET_ERRORS,
            payload: {},
          });
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response?.data);
      dispatch({
        type: GET_ERRORS,
        payload: {
          res: error.response?.data,
          status: error.response?.status,
        },
      });
    }
  };
