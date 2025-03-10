import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  username: localStorage.getItem("username") ?? "",
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("username", action.payload);
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.username = "";
      state.isLoggedIn = false;
      localStorage.removeItem("username");
      localStorage.setItem("isLoggedIn", "false");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
