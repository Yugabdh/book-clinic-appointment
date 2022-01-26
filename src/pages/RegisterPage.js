import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeVisible } from '../redux/navbarTransparent';

import SectionComponent from '../components/SectionComponent/';

const RegisterPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  return (
    <>
    <SectionComponent title="Register" content={""} />
    </>
  );
};

export default RegisterPage;
