import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    subGroups: {},
  },
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },

    addSubGroup: (state, action) => {
      const { groupName, subGroupName } = action.payload;
      if (!state.subGroups[groupName]) {
        state.subGroups[groupName] = [];
      }
      state.subGroups[groupName].push(subGroupName);
    },
  },
});

export const { addGroup, addSubGroup } = groupSlice.actions;

export default groupSlice.reducer;
