import React from 'react';
import Table from 'react-bootstrap/Table';

const AppointmentsTabelComponent = (props) => {
  const appointmentList = props.appointments.map((appointment, i) => 
  <tr key={i}>
    <td>{parseInt(i)+1}</td>
    <td>{appointment.appointmentName}</td>
    <td>{appointment.date}</td>
    <td>{appointment.slot}</td>
    <td className={`status status-`+appointment.status}>{appointment.status}</td>
  </tr>
  );
  return(
    <Table striped hover responsive="sm" className="appointment-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Appointment</th>
          <th>Date</th>
          <th>Timeslot</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {appointmentList}
      </tbody>
    </Table>
  );
};

export default AppointmentsTabelComponent;
