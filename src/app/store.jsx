import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/saved";

export const store = configureStore({
  reducer: { filter: filterReducer },
});