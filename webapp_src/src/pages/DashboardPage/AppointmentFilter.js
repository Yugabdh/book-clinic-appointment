import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import Form from 'react-bootstrap/Form';

const AppointmentFilter = ({formDate, setFormDate}) => {

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

  return (
    <Form className="filter-form" onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-3 filter-group" controlId="formPlaintextEmail">
        <Form.Label>
          Filter by date
        </Form.Label>
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
  );
}

export default AppointmentFilter