import React from 'react'

const AppointmentsList = ({appoinmentList, setPatient}) => appoinmentList.map((appointment, idx) => {
  return (
  <div className="appointment-item shadow p-3 mb-3 bg-white rounded" onClick={() => {setPatient({uid: appointment.uid, fullName: appointment.fullName})}} key={idx}>
    <p className="username">{appointment.fullName}</p>
    <p className="phonenumber">{appointment.phoneNumber}</p>
  </div>
  );
});

export default AppointmentsList;