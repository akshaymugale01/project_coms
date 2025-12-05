import { createSlice } from '@reduxjs/toolkit';

const added = createSlice({
  name: 'added',
  initialState: false, // default initial value
  reducers: {
    setTrue: (state) => true,
    setFalse: (state) => false,
    toggle: (state) => !state,
  },
});

export const { setTrue, setFalse, toggle } = added.actions;
export default added.reducer;
