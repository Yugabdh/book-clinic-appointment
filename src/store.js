import { configureStore } from '@reduxjs/toolkit';
import navbarTransparent from './redux/navbarTransparent';
import userSlice from './redux/userSlice';

export default configureStore({
  reducer: {
    navbarTransparent: navbarTransparent,
    userSlice: userSlice
  },
});