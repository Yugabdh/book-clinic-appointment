import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeVisible } from '../redux/navbarTransparent';

import SectionComponent from '../components/SectionComponent/';

const LoginPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  return (
    <>
    <SectionComponent title="Login" content={""} />
    </>
  );
};

export default LoginPage;
