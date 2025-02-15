import {
    SET_CURRENT_USER,
    GET_USER,
    SET_NEW_USER,
  } from "../constants/types";
  
  const initialState = {
    user: {},
    validToken: false,
    userData: {},
  };
  
  const booleanPayload = (payload: any) => {
    if (payload) {
      return true;
    } else {
      return false;
    }
  };
  
  export default function setUser(state = initialState, action: any) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          validToken: booleanPayload(action.payload),
          user: action.payload,
        };
      case SET_NEW_USER:
        return {
          userData: action.payload,
        };
      case GET_USER:
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  }
  