import { createSlice } from "@reduxjs/toolkit";
import getTheme from "../../utils/getTheme";

const initialState = getTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
