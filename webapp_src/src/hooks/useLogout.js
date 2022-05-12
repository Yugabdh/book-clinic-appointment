import { useDispatch, useSelector } from 'react-redux';

import { logout, selectUser } from '../redux/user';
import { auth } from '../firebase';

const useLogout = (callback) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logoutUser = () => {
    if (user) {
      dispatch(logout());
      auth.signOut();
      callback();
    }
  };

  return {
    logoutUser,
  }
};

export default useLogout;