import React from 'react'

const AppointmentsList = ({appoinmentList, setPatientUID}) => appoinmentList.map((appointment, idx) => {
  return (
  <div className="appointment-item shadow p-3 mb-3 bg-white rounded" onClick={() => {setPatientUID(appointment.uid)}} key={idx}>
    <p className="username">{appointment.fullName}</p>
    <p className="phonenumber">{appointment.phoneNumber}</p>
  </div>
  );
});

export default AppointmentsList;