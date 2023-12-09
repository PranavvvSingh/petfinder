import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter";
import favoritesReducer from "../features/favorites";
import authReducer from "../features/auth"

export const store = configureStore({
  reducer: { filter: filterReducer, favorites: favoritesReducer, auth:authReducer },
});