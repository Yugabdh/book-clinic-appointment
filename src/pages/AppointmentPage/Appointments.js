import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';

import AppointmentsTableComponent from '../../components/AppointmentsTableComponent';


const Appointments = ({ formDate }) => {
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

  const { currentUser } = useAuth();
  console.log('Appointments: '+convertDate(formDate));
  const q = query(collection(db, "users/"+currentUser.uid+"/appointments/"+convertDate(formDate)+"/appointments"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = [];
      querySnapshot.forEach((doc) => {
        appointments.push(doc.data());
      });
      setAppointments(appointments);
      console.log("Appointments: ", appointments);
    });
    return unsubscribe;
  }, [currentUser.uid, formDate]);
  return <AppointmentsTableComponent appointments={appointments} />;
};

export default Appointments;
