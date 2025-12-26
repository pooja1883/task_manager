import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    filters: { status: "All", priority: "All", search: "" },
    sortOrder: "asc",
    theme: "light",
  },

  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    toggleTheme: state => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setFilter, setSortOrder, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
