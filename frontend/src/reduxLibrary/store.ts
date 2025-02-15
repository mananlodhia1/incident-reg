import itemReducer from "../services/reducers/itemReducer";
import responseReducer from "../services/reducers/responseReducer";
import securityReducer from "../services/reducers/securityReducer";

import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      items: itemReducer,
      response: responseReducer,
      security: securityReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
