import { GET_ERRORS, GET_SUCCESS, RESET_SUCCESS } from "../constants/types";

const initialState = {
  status: null,
  errors: {},
  success: {
    type: "",
    response: {},
  },
};

export default function responseReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        status: action.payload.status,
        errors: {
          message: action.payload.res?.message,
        },
      };
    case GET_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        success: {
          type: "",
          response: action.payload.res,
        },
      };
    case RESET_SUCCESS:
      return {
        ...state,
        success: {
          type: "",
          response: {},
        },
      };

    default:
      return state;
  }
}
