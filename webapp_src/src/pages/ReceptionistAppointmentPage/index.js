import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeVisible } from '../../redux/navbarTransparent';

import CardComponentWithHeading from '../../components/CardComponentWithHeading';
import AppointmentForm from './AppointmentForm';

const ReceptionistAppointmentPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  return (
    <section className="appointment-page">
      <CardComponentWithHeading 
        heading={
          <>
            <div className="d-flex justify-content-between align-items-center header">
              <h3 className="card-heading">Book appointment</h3>
            </div>
          </>
        } 
        children={<AppointmentForm />}
      />
    </section>
  );
};

export default ReceptionistAppointmentPage;
