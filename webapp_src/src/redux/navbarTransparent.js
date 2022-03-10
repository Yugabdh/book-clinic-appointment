import { createSlice } from '@reduxjs/toolkit';

export const navbarTransparent = createSlice({
  name: 'navbarTransparent',
  initialState: {
    transparent: true,
  },
  reducers: {
    makeTransparent: (state) => {
      state.transparent = true
    },

    makeVisible: (state) => {
      state.transparent = false
    },
  },
});

// Action creators are generated for each case reducer function
export const { makeTransparent, makeVisible } = navbarTransparent.actions;

export default navbarTransparent.reducer;