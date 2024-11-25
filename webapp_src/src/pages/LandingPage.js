import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeTransparent } from '../redux/navbarTransparent';
import HeroHeaderComponent from '../components/HeroHeaderComponent';
import ServicesComponent from '../components/ServicesComponent';
import CallToActionComponent from '../components/CallToActionComponent';
import YearsOfExperience from '../components/YearsOfExperience';
import ContactComponent from '../components/ContactComponent';

const LandingPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeTransparent());
  }, [dispatch]);

  return (
    <>
      <HeroHeaderComponent />
      <ServicesComponent />
      <CallToActionComponent />
      <YearsOfExperience />
      <ContactComponent />
    </>
  );
};

export default LandingPage;
