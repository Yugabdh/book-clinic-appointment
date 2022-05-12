import React, { useState } from 'react';

import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent/';
import AppointmentFilter from './AppointmentFilter';
import Appointments from '../AppointmentPage/Appointments';

const AppointmentWrapper = ({user, loading}) => {

  const [formDate, setFormDate] = useState(new Date());

  return (
    <>
    {loading ? (
      <FullScreenLoaderComponent />
    ) : (
      <>
        <AppointmentFilter setFormDate={setFormDate} formDate={formDate} />
        <Appointments user={user} formDate={formDate} />
      </>
    )}
    </>
  )
}

export default AppointmentWrapper