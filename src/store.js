import { configureStore } from '@reduxjs/toolkit';
import navbarTransparent from './redux/navbarTransparent';

export default configureStore({
  reducer: {
    navbarTransparent: navbarTransparent,
  },
});