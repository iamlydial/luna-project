import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import searchReducer from "./slices/search";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});
