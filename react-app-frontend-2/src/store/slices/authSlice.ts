import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";

const storedUser = localStorage.getItem("authUser");
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  isLoading: false,
  error: null,
  hasFetchedUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.hasFetchedUser = true;
      localStorage.removeItem("authUser");
    },
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
  },
});

export const { clearError, clearAuth, setAuth } = authSlice.actions;
export default authSlice.reducer;