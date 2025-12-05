import { createSlice } from '@reduxjs/toolkit';

const fileExplorerSlice = createSlice({
  name: 'fileExplorer',
  initialState: [],
  reducers: {
    addFolder: (state, action) => {
      state.push({ type: 'folder', name: action.payload.name, path: action.payload.path });
    },
    addFile: (state, action) => {
      state.push({ type: 'file', name: action.payload.name, path: action.payload.path });
    },
  },
});

export const { addFolder, addFile } = fileExplorerSlice.actions;
export default fileExplorerSlice.reducer;
