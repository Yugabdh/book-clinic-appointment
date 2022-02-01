import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeVisible } from '../../redux/navbarTransparent';

import ProfileForm from './ProfileForm';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const ProfilePage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  });

  const profileForm = <ProfileForm />;

  return(
    <section className="profile-page">
      <CardComponentWithHeading heading="Profile" children={profileForm} />
    </section>
  );
};

export default ProfilePage;
