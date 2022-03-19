import React from 'react';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { db } from '../../firebase';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 


const ReceptionAppointmentsTabelComponent = (props) => {
  const timeToSlotMapping = {
    "slot1": "09:00 AM-12:00 PM",
    "slot2": "12:00 PM-03:00 PM",
    "slot3": "03:00 PM-06:00 PM",
    "slot4": "06:00 PM-09:00 PM",
  }

  async function acceptAppointment(event) {
    let appointmentId = event.target.getAttribute('data-appoinmentid');
    let userAppointmentId = event.target.getAttribute('data-userappoinmentid');
    let uid = event.target.getAttribute('data-uid');
    let slot = props.slot;

    if(appointmentId) {
      console.log('Appointment Id: ' + appointmentId+' userId: ' + uid+' slot: ' + slot+' userAppointmentId: '+userAppointmentId);

      await setDoc(doc(db, "appointments/"+props.formDate+"/"+slot, appointmentId), {
        status: "approved"
      }, { merge: true });

      if(uid) {
        await setDoc(doc(db, "users/"+uid+"/appointments/"+props.formDate+"/appointments", userAppointmentId), {
          status: "approved"
        }, { merge: true });
      }
    }
  }

  async function rejectAppointment(event) {
    let appointmentId = event.target.getAttribute('data-appoinmentid');
    let userAppointmentId = event.target.getAttribute('data-userappoinmentid');
    let uid = event.target.getAttribute('data-uid');
    let slot = props.slot;

    if(appointmentId) {
      console.log('Appointment Id: ' + appointmentId+' userId: ' + uid+' slot: ' + slot+' userAppointmentId: '+userAppointmentId);
      await deleteDoc(doc(db, "appointments/"+props.formDate+"/"+slot, appointmentId));
      const slotcounterRef = doc(db, "appointments", props.formDate);
      const docSnap = await getDoc(slotcounterRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const slotdata = docSnap.data();
        slotdata[slot+"_counter"] -= 1;
        console.log(slotdata)
        await setDoc(slotcounterRef, {
          ...slotdata
        }).then((ref)=> {
          if(uid) {
            setDoc(doc(db, "users/"+uid+"/appointments/"+props.formDate+"/appointments", userAppointmentId), {
              status: "rejected"
            }, { merge: true });
          }
        })
      } else {
        alert("Error occured please refresh the page");
      }
    }
  }

  const appointmentList = props.appointments.map((appointment, i) => 
    <tr key={i}>
      <td>{parseInt(i)+1}</td>
      <td>{appointment.uname}</td>
      <td>{appointment.unumber}</td>
      <td>{timeToSlotMapping[props.slot]}</td>
      <td className={`status status-`+appointment.status}>{appointment.status}</td>
      <td>
      <ButtonGroup aria-label="Basic example">
        <Button 
          variant="success"
          data-appoinmentid={appointment.docId}
          data-userappoinmentid={appointment.appointmentId}
          data-uid={appointment.uid}
          onClick={event => acceptAppointment(event)}
        >
          Accept
        </Button>

        <Button
          variant="danger"
          data-appoinmentid={appointment.docId}
          data-userappoinmentid={appointment.appointmentId}
          data-uid={appointment.uid}
          onClick={event => rejectAppointment(event)}
        >
          Reject
        </Button>
      </ButtonGroup>
      </td>
    </tr>
  );

  return(
    <Table striped hover responsive="sm" className="appointment-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Patient Name</th>
          <th>Mobile Number</th>
          <th>Timeslot</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {appointmentList}
      </tbody>
    </Table>
  );
};

export default ReceptionAppointmentsTabelComponent;
