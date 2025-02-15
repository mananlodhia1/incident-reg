import axios, { AxiosInstance } from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "../services/constants/types";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";


const authAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  withCredentials: true,
});

const setToken = (token: string, axiosInstance: AxiosInstance = axios) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const handleRefTokenError = (dispatch: any) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
  Cookies.remove("tkn_valid");
  localStorage.removeItem("ref_token");
};

const refreshToken = async (dispatch: any) => {
  try {
    const ref = await authAxios.post(
      "/refresh-token",
      {
        username: localStorage.getItem("username"),
        ref_token: localStorage.getItem("ref_token"),
      },
    );

    return ref;
  } catch (error: any) {
    console.log(error);
    handleRefTokenError(dispatch);
    return error.response;
  }
};

const getAccessToken = async (dispatch: any) => {
  const res = await refreshToken(dispatch);

  try {
    if (res && res.status === 200) {
      const decoded_token = jwtDecode(res.data.token.IdToken);
      setToken(res.data.access);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_token,
      });
    } else {
      handleRefTokenError(dispatch);
    }
  } catch (error: any) {
    dispatch({
      type: GET_ERRORS,
      payload: {
        res: error.response?.data,
        status: error.response?.status,
      },
    });
    handleRefTokenError(dispatch);
  }
};

export { setToken, refreshToken, getAccessToken };
