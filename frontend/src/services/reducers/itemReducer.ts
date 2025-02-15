import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_INCIDENT,
  GET_INCIDENTS,
  RESET_STATE,
} from "../constants/types";

const initialState = {
  items: {
    $metadata: {}, 
    Count: 0,
    Items: [] as { id: string }[], 
    ScannedCount: 0,
  },
  singleItem: [] as { id: string }[],
};

export default function setItems(state = initialState, action: any) {
  switch (action.type) {
    case GET_INCIDENTS:
      return {
        ...state,
        items: action.payload,
      };
    case GET_INCIDENT:
      return {
        ...state,
        singleItem: action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          Items: state.items.Items.filter((item) => item.id !== action.payload.id)
        }
      };
    case ADD_ITEM:
      console.log(state)

      return {
        ...state,
        items: {
          ...state.items,
          Items: [...state.items.Items, action.payload],
        },
      };
    case RESET_STATE:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}
