import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: false,
    isPending: false,
  },
  reducers: {
    login: (state) => {
      state.user = true;
    },
    logout: (state) => {
      state.user = false;
    },
    setPending: (state, action) => {
      state.isPending=action.payload
    },
  },
});

export default authSlice.reducer;
export const { login, logout, setPending } = authSlice.actions;
