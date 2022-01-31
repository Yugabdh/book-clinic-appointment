import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import navbarTransparent from './redux/navbarTransparent';

export default configureStore({
  reducer: {
    firebase: firebaseReducer,
    navbarTransparent: navbarTransparent,
  },
});