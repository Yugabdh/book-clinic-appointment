import React from 'react';
import SectionComponent from '../SectionComponent/';
import Services from './Services';

const ServicesComponent = () => {
  const servicesList = [
    {
      id: 0,
      title: "Filling",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/assets/images/svg/tooth-icons/tooth-filling.svg"
    },
    {
      id: 1,
      title: "Smile Designing",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/assets/images/svg/tooth-icons/smile-designing.svg"
    },
    {
      id: 2,
      title: "Implant",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/assets/images/svg/tooth-icons/teeth-implant.svg"
    },
    {
      id: 3,
      title: "Crown",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/assets/images/svg/tooth-icons/teeth-crowning.svg"
    },
    {
      id: 4,
      title: "Braces",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/assets/images/svg/tooth-icons/teeth-braces.svg"
    },
    {
      id: 5,
      title: "Clean up & Whitening",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/assets/images/svg/tooth-icons/teeth-whitening.svg"
    },
    {
      id: 6,
      title: "Root Canal",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/assets/images/svg/tooth-icons/root-canal.svg"
    }
  ];

  const ServicesComponent = <Services servicesList={servicesList} />

  return (
    <SectionComponent title="Our Services" content={ServicesComponent} />
  );
};

export default ServicesComponent;
