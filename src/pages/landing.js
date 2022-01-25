import React from 'react';
import HeroHeaderComponent from '../components/HeroHeaderComponent';
import ServicesComponent from '../components/ServicesComponent';
import CallToActionComponent from '../components/CallToActionComponent';
import ContactComponent from '../components/ContactComponent';

const LandingPage = () => {
  return (
    <>
      <HeroHeaderComponent />
      <ServicesComponent />
      <CallToActionComponent />
      <ContactComponent />
    </>
  );
};

export default LandingPage;
