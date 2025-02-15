import {  useEffect, useState, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../reduxLibrary/hooks";
import { GET_ERRORS, GET_SUCCESS } from "../services/constants/types";
import { useLocation } from "react-router-dom";
import { ERRORS, SUCCESS } from "../services/constants/status";
import { ResponseContext } from "./responseContext";

interface ResponseProps {
  children: ReactNode;
}

interface ResponseState {
  status?: number | null;
  errors?: Record<string, any>;
  success: {
    type: string;
    response: Record<string, any>;
  };
}


function ResponseProvider({ children }: ResponseProps) {
  const [response, setResponse] = useState<Record<string, unknown>>({});
  const dispatch = useAppDispatch();
  const pathname = useLocation();

  const reducer = useAppSelector(
    (state: { response: ResponseState }) => state.response
  );

  useEffect(() => {
    if (Object.values(ERRORS).includes(reducer.status)) {
      if (reducer.errors.message) {
        setResponse({
          message: reducer.errors.message,
          status: reducer.status
        });
      }
    } else if (Object.values(SUCCESS).includes(reducer.status)) {
      if (reducer.success.response.message) {
        setResponse({
          message: reducer.success.response.message,
          status: reducer.status
        });
      }
    }
  }, [reducer]);

  //reset response to initial state if route changes
  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    dispatch({
      type: GET_SUCCESS,
      payload: {},
    });
    // setResponse({});
  }, [pathname, dispatch]);

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  );
}

export default ResponseProvider;
