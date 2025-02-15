import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_INCIDENT,
  GET_INCIDENTS,
} from "../constants/types";
import { securedDelete, securedGet, securedPost } from "../../security/axios";

export const getItems = () => {
  return securedGet({
    api: `/incidents`,
    body: null,
    dispatchType: GET_INCIDENTS,
  });
};

export const getSingleItem = (id: string, setIsLoading: any) => {
  return securedGet({
    api: `/incident/${id}`,
    body: null,
    dispatchType: GET_INCIDENT,
    setLoad: setIsLoading,
  });
};

export const addItem = (
  AddItemRequest: any,
  setIsLoading: any,
  setError: any
) => {
  return securedPost({
    api: `/newIncident`,
    body: AddItemRequest,
    dispatchType: ADD_ITEM,
    setLoad: setIsLoading,
    setError: setError,
  });
};

export const deleteItem = (
  id: string,
  media: object,
  setIsLoading: any,
  setError: any
) => {
  return securedDelete({
    api: `/delete/${id}`,
    body: { data: { media } },
    dispatchType: DELETE_ITEM,
    setLoad: setIsLoading,
    setError: setError,
  });
};
