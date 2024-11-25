import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

import { selectUser } from '../../redux/user';

import ReceptionAppointmentsTabelComponent from '../../components/ReceptionAppointmentsTabelComponent';


const Appointments = ({ formDate, radioValue }) => {
  const convertDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    const dateInFormate = [day, month, year].join('-');
    return dateInFormate;
  }

  const user = useSelector(selectUser);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "appointments/"+convertDate(formDate)+"/"+radioValue), orderBy("created", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = [];
      querySnapshot.forEach((doc) => {
        appointments.push({...doc.data(), docId: doc.id});
      });
      setAppointments(appointments);
    });
    return unsubscribe;
  }, [user.uid, formDate, radioValue]);
  return <ReceptionAppointmentsTabelComponent appointments={appointments} slot={radioValue} formDate={convertDate(formDate)}/>;
};

export default Appointments;
