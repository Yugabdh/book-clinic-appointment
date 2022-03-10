import React, { useState } from 'react';

import AppointmentFilter from './AppointmentFilter';
import Appointments from '../AppointmentPage/Appointments';

const AppointmentWrapper = () => {

  const [formDate, setFormDate] = useState(new Date());

  return (
    <>
    <AppointmentFilter setFormDate={setFormDate} formDate={formDate} />
    <Appointments formDate={formDate} />
    </>
  )
}

export default AppointmentWrapper