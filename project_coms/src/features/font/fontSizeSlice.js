import { createSlice } from "@reduxjs/toolkit";

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState: "text-sm",
  reducers: {
    setFontSize: (state, action) => action.payload,
  },
});

export const { setFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;