import axios from "axios";
import { refreshToken, setToken } from "./setToken";
import { GET_ERRORS, GET_SUCCESS } from "../services/constants/types";
import { ApiRequestModel } from "../models/apiModel";
import {  SUCCESS } from "../services/constants/status";

const apiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

//get
const securedGet =
  ({
    api,
    body = {},
    dispatchType,
    setLoad = null,
    setError = null,
  }: ApiRequestModel) =>
  async (dispatch: any) => {
    try {
      const ref = await refreshToken(dispatch);
      setToken(ref.data.token.AccessToken, apiAxios);
      if (setLoad) setLoad(true);
      const res = await apiAxios.get(api, body);
      if (Object.values(SUCCESS).includes(res.status)) {
        if (setLoad) {
          setLoad(false);
        }
        if (setError) {
          setError(res.status);
        }
        dispatch({
          type: dispatchType,
          payload: res.data,
        });
        return res;
      }
    } catch (error) {
      if (setLoad) {
        setLoad(false);
      }
      if (setError) {
        setError(error.response.data);
      }
      dispatch({
        type: GET_ERRORS,
        payload: {res: error.response?.data, status: error.response.status}
      });

      return error.response;
    }
  };

//post
const securedPost =
  ({
    api,
    body = {},
    dispatchType,
    setLoad = null,
    setError = null,
    navigate = null,
    redirectTo,
  }: ApiRequestModel) =>
  async (dispatch: any) => {
    if (setLoad) setLoad(true);

    try {
      const ref = await refreshToken(dispatch);
      setToken(ref.data.token.AccessToken, apiAxios);
      const res = await apiAxios.post(api, body);

      if (Object.values(SUCCESS).includes(res.status)) {
        dispatch({
          type: GET_SUCCESS,
          payload: { res: res.data, status: res.status },
        });
        dispatch({
          type: dispatchType,
          payload: res.data.res,
        });
        if (setLoad) {
          setLoad(false);
        }
        if (setError) {
          setError(res.status);
        }
        if (navigate) {
          navigate(redirectTo);
        }
        return res;
      }
    } catch (error) {
      console.log(error)

      if (setLoad) {
        setLoad(false);
      }
      if (setError) {
        setError(error.response?.data);
      }
      dispatch({
        type: GET_ERRORS,
        payload: {res: error.response?.data, status: error.response?.status}
      });
      return error.response;
    }
  };



//delete
const securedDelete =
  ({
   
    api,
    body = {},
    dispatchType,
    setLoad = null,
    setError = null,
    navigate = null,
    redirectTo,
  }: ApiRequestModel) =>
  async (dispatch: any) => {
    if (setLoad) setLoad(true);

    try {
      const ref = await refreshToken(dispatch);
      setToken(ref.data.token.AccessToken, apiAxios);

      const res = await apiAxios.delete(api, body);
      if (Object.values(SUCCESS).includes(res.status)) {
        const id = res.data.id 
        dispatch({
          type: GET_SUCCESS,
          payload: { res: res.data, status: res.status },
        });
        dispatch({
          type: dispatchType,
          payload: { id },
        });
        if (setLoad) {
          setLoad(false);
        }
        if (setError) {
          setError(res.status);
        }
        if (navigate) {
          navigate(redirectTo);
        }
        return res;
      }
    } catch (error) {
      if (setLoad) {
        setLoad(false);
      }

      if (setError) {
        setError(error.response.data);
      }

      dispatch({
        type: GET_ERRORS,
        payload: {res: error.response?.data, status: error.response.status}
      });
      return error;
    }
  };


export { securedGet, securedPost, securedDelete };
