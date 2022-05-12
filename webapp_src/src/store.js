import { configureStore } from '@reduxjs/toolkit';
import navbarTransparent from './redux/navbarTransparent';
import user from './redux/user';

export default configureStore({
  reducer: {
    navbarTransparent: navbarTransparent,
    user: user
  },
});