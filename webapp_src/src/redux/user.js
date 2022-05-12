import { createSlice } from '@reduxjs/toolkit';

export const userDetails = createSlice({
  name: 'user',
  initialState: {
    user: null,
    claims: {
      doctor: false, receptionist: false,
    }
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setClaims: (state, action) => {
      state.claims = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.claims = {doctor: false, receptionist: false,};
    },
  },
});

// actions
export const { login, logout, setUser, setClaims } = userDetails.actions;

// selectors
export const selectUser = (state) => state.user.user;
export const selectClaims = (state) => state.user.claims;

export default userDetails.reducer;