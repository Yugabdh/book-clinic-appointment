import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeVisible } from '../../redux/navbarTransparent';

import CardComponentWithHeading from '../../components/CardComponentWithHeading';
import Appointments from './Appointments';

const AppointmentPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);
  console.log("Appointments");

  return (
    <section className="appointment-page">
      <CardComponentWithHeading 
        heading={
          <>
            <div className="d-flex justify-content-between align-items-center header">
              <h3 className="card-heading">Appointments</h3>
              <Link to="/appointments" className="primary-button d-none d-md-block">New Appointment</Link>
            </div>
          </>
        } 
        children={<Appointments />}
      />
    </section>
  );
};

export default AppointmentPage;
