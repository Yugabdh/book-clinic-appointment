import React from 'react';
import SectionComponent from '../SectionComponent/';
import Services from './Services';

const ServicesComponent = () => {
  const servicesList = [
    {
      id: 0,
      title: "Filling",
      details: "Restore a tooth that has a cavity, fix a broken tooth, or change the shape and size of a tooth.",
      logo: "/assets/images/svg/tooth-icons/tooth-filling.svg"
    },
    {
      id: 1,
      title: "Smile Designing",
      details: "Smile design is a cosmetic dental procedure that corrects teeth imperfections and restores your dental health and appearance.",
      logo: "/assets/images/svg/tooth-icons/smile-designing.svg"
    },
    {
      id: 2,
      title: "Implant",
      details: "A dental implant is a metal post that replaces the root portion of a missing tooth. An artificial tooth is placed on an extension of the post on the dental implant, giving you the look of a real tooth.",
      logo: "/assets/images/svg/tooth-icons/teeth-implant.svg"
    },
    {
      id: 3,
      title: "Crown",
      details: "Dental crowns are tooth-shaped “caps” that can be placed over your tooth. Think of it like a snug hat for your tooth. The crown restores the tooth's shape, size, strength and appearance.",
      logo: "/assets/images/svg/tooth-icons/teeth-crowning.svg"
    },
    {
      id: 4,
      title: "Braces",
      details: "Braces are dental tools that help correct problems with your teeth, like crowding, crooked teeth, or teeth that are out of alignment.",
      logo: "/assets/images/svg/tooth-icons/teeth-braces.svg"
    },
    {
      id: 5,
      title: "Clean up & Whitening",
      details: "Teeth whitening is a cosmetic dental procedure that lightens pigmentation within the teeth. Scaling and polishing is a procedure that removes dental plaque, tartar and extrinsic stains that are present on the outer surface of the teeth.",
      logo: "/assets/images/svg/tooth-icons/teeth-whitening.svg"
    },
    {
      id: 6,
      title: "Root Canal",
      details: "Root canal treatment, or endodontic treatment, is the procedure involving the removal of infected or dead pulp from your tooth root canal area (The area inside of the hard part of your tooth).",
      logo: "/assets/images/svg/tooth-icons/root-canal.svg"
    }
  ];

  const ServicesComponent = <Services servicesList={servicesList} />

  return (
    <SectionComponent title="Our Services" content={ServicesComponent} />
  );
};

export default ServicesComponent;
