import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const authSlice = createSlice({
  name: "auth",
  initialState: savedAuth || {
    isAuthenticated: false,
    user: null,
  },

  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;

      const isValid =
        email === "admin@test.com" && password === "123456";

      // If invalid, just do nothing — UI will handle error
      if (!isValid) return;

      state.isAuthenticated = true;
      state.user = { email };

      localStorage.setItem("auth", JSON.stringify(state));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
