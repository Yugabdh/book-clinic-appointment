import React, { useState } from 'react';

import AppointmentFilter from './AppointmentFilter';
import Appointments from './Appointments';

const AppointmentWrapper = () => {

  const [formDate, setFormDate] = useState(new Date());
  const [radioValue, setRadioValue] = useState('slot1');

  return (
    <>
    <AppointmentFilter setFormDate={setFormDate} formDate={formDate} radioValue={radioValue} setRadioValue={setRadioValue} />
    <Appointments formDate={formDate} radioValue={radioValue} />
    </>
  )
}

export default AppointmentWrapper