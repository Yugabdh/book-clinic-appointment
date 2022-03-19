import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const AppointmentFilter = ({formDate, setFormDate, radioValue, setRadioValue}) => {

  const [localDate, setLocalDate] = useState(formDate);

  // weekday checker
  const isWeekday = (date) => {
    const day = new Date(date).getDate();
    return day !== 0 && day !== 6;
  };
  

  const handleChangeDate = (date) => {
    setLocalDate(date);
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setFormDate(localDate);
  };

  const radios = [
    { name: 'Slot 1', value: 'slot1' },
    { name: 'Slot 2', value: 'slot2' },
    { name: 'Slot 3', value: 'slot3' },
    { name: 'Slot 4', value: 'slot4' },
  ];

  return (
    <div className="admin-filter-wrapper">
      <Form className="filter-form-admin" onSubmit={ handleSubmit } noValidate>
        <Form.Group className="mb-3 filter-group" controlId="formPlaintextEmail">
          <DatePicker
            name="formAppointmentDate"
            selected={localDate}
            placeholderText="Appointment day"
            onChange={date => handleChangeDate(date)}
            dateFormat='dd-MM-yyyy'
            minDate={new Date()}
            maxDate={new Date().setDate(new Date().getDate() + 5)}
            className="form-control"
            filterDate={isWeekday}
            autoComplete="off"
          />
          <div className="button-wrapper">
            <button type="submit" className="primary-button">Filter</button>
          </div>
        </Form.Group>
      </Form>
      <ButtonGroup className="mb-3">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default AppointmentFilter;