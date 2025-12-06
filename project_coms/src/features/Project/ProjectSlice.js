

import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
    activeView: 'Kanban',
    selectedEmail: [],
    taskData:null
  },
  reducers: {
    fetchBoardDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBoardDataSuccess: (state, action) => {
      const data = action.payload;
      state.data = data.board;
      state.taskData = data.data;
      state.activeView = data.board_view || 'Kanban';
      state.selectedEmail = data.board.assign_to.map((email) => ({
        value: email.user_id,
        label: email.email,
      }));
      state.isLoading = false;
    },
    fetchBoardDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateActiveView: (state, action) => {
      state.activeView = action.payload;
    },
  },
});

export const { fetchBoardDataStart, fetchBoardDataSuccess, fetchBoardDataFailure, updateActiveView  } = boardSlice.actions;

export default boardSlice.reducer;
