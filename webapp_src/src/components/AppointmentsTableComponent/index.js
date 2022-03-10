import React from 'react';
import Table from 'react-bootstrap/Table';

const AppointmentsTabelComponent = (props) => {
  const timeToSlotMapping = {
    "slot1": "09:00 AM-12:00 PM",
    "slot2": "12:00 PM-03:00 PM",
    "slot3": "03:00 PM-06:00 PM",
    "slot4": "06:00 PM-09:00 PM",
  }

  const appointmentList = props.appointments.map((appointment, i) => 
    <tr key={i}>
      <td>{parseInt(i)+1}</td>
      <td>{appointment.appointmentName}</td>
      <td>{timeToSlotMapping[appointment.slot]}</td>
      <td className={`status status-`+appointment.status}>{appointment.status}</td>
    </tr>
  );
  return(
    <Table striped hover responsive="sm" className="appointment-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Appointment</th>
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
