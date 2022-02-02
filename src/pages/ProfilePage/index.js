import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeVisible } from '../../redux/navbarTransparent';

import ProfileForm from './ProfileForm';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const ProfilePage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const profileForm = <ProfileForm />;

  return(
    <section className="profile-page">
      <CardComponentWithHeading heading={<h3 className="card-heading">Profile</h3>} children={profileForm} />
    </section>
  );
};

export default ProfilePage;
