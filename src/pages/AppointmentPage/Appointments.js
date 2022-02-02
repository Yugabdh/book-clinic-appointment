import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';

import AppointmentsTableComponent from '../../components/AppointmentsTableComponent';


const Appointments = () => {
  const { currentUser } = useAuth();
  const q = query(collection(db, "users/"+currentUser.uid+"/appointments"));
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
  }, [currentUser.uid]);
  return <AppointmentsTableComponent appointments={appointments} />;
};

export default Appointments;
