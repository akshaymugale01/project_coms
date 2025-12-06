import { createSlice } from "@reduxjs/toolkit";

export const dueDateSlice = createSlice({
  name: "dueDate",
  initialState: {
    date:""
  },
  reducers: {
    setDueDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDueDate } = dueDateSlice.actions;

export default dueDateSlice.reducer;



