import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeColorsType } from "./colors/ThemeColorsType";
import darkColors from "./colors/darkColors";
import lightColors from "./colors/lightColors";

type ThemeState = {
  colors: ThemeColorsType;
  themeMode: "light" | "dark";
};

const initialState: ThemeState = {
  colors: darkColors,
  themeMode: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (
      state,
      action: PayloadAction<{ mode: "light" | "dark" }>
    ) => {
      const mode = action.payload.mode;
      state.themeMode = mode;
      state.colors = mode === "light" ? lightColors : darkColors;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice;
