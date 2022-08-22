import React, { useState, useEffect } from 'react';

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from '../../firebase';

import AppointmentsTableComponent from '../../components/AppointmentsTableComponent';


const Appointments = ({ user, formDate }) => {
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
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    let date = convertDate(formDate);
    const q = query(collection(db, "users/"+user.uid, "appointments"), where("date", "==", date));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = [];
      querySnapshot.forEach((doc) => {
        appointments.push(doc.data());
      });
      appointments.sort(function(a, b) {
        var keyA = a.created.toDate(),
          keyB = b.created.toDate();
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      setAppointments(appointments);
    });
    return unsubscribe;
  }, [user.uid, formDate]);
  return <AppointmentsTableComponent appointments={appointments} />;
};

export default Appointments;
