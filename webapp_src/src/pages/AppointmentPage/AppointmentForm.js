import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import useForm from '../../hooks/useForm';
import useGetUserData from '../../hooks/useGetUserData';

import { addDoc, setDoc, collection, serverTimestamp, onSnapshot, query, doc } from "firebase/firestore";
import { db } from '../../firebase';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent';
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import validate from './AppointmentFormValidationRules';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { loading, user, } = useGetUserData();

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  // slot counter and disable flag
  const [slotCounter, setSlotCounter] = useState({
    slot1_counter: 0,
    slot2_counter: 0,
    slot3_counter: 0,
    slot4_counter: 0
  });
  const [slotStatusFlag, setSlotStatusFlag] = useState({ slot1: false, slot2: false, slot3: false, slot4: false});

  // date for date picker as it uses Date class object as value
  const [formDate, setFormDate] = useState();

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

  // weekday checker
  const isWeekday = (date) => {
    const day = new Date(date).getDate();
    return day !== 0 && day !== 6;
  };


  // Handle changes of date field converting it to valid firestore doc id
  const handleChangeDate = (date) => {
    const dateInFormate = convertDate(date);
    setValues(values => ({ ...values, 'appointmentDate': dateInFormate}))
    setFormDate(date);
  }

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    isSubmitting,
    setIsSubmitting,
  } = useForm(updateFirebase, validate);

  // slots counter state handler
  useEffect(() => {
    // unselect if any value is selected
    setValues({...values, slot: null});
    setSlotStatusFlag({ slot1: false, slot2: false, slot3: false, slot4: false });
    if (values.appointmentDate) {
      const q = query(doc(db, "appointments/"+values.appointmentDate));
      var data = {}
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        data = querySnapshot.data();
        if (data) {
          if (data.slot1_counter >= 4) {
            setSlotStatusFlag({...slotStatusFlag, slot1: true})
          }
          if (data.slot2_counter >= 4) {
            setSlotStatusFlag({...slotStatusFlag, slot2: true})
          }
          if (data.slot3_counter >= 4) {
            setSlotStatusFlag({...slotStatusFlag, slot3: true})
          }
          if (data.slot4_counter >= 4) {
            setSlotStatusFlag({...slotStatusFlag, slot4: true})
          }

          setSlotCounter({...data})
        }
      });

      return unsubscribe;
    }
  }, [values.appointmentDate]);

  async function updateFirebase() {
    const timeToSlotMapping = {
      "slot1": "09:00 AM-12:00 PM",
      "slot2": "12:00 PM-03:00 PM",
      "slot3": "03:00 PM-06:00 PM",
      "slot4": "06:00 PM-09:00 PM",
    }
    if(user.uid && user.fullName) {
      if (!(slotCounter[values.slot+"_counter"] >= 4)) {
        slotCounter[values.slot+"_counter"] += 1;
        const slotcounterRef = doc(db, "appointments", values.appointmentDate);
            
        // incrementing appoinment counter
        await setDoc(slotcounterRef, {
          ...slotCounter
        }).then(
          (slotupdateRef) => {
            const serverTS = serverTimestamp();

            // adding appointment to users appointment collection
            addDoc(collection(db, "users/"+user.uid, "appointments"), {
              appointmentName: values.appointmentName,
              date: values.appointmentDate,
              slot: values.slot,
              symtoms: values.symptoms,
              status: 'pending',
              created: serverTS
            }).then((ref) => {

              // adding appointment to appoinment collection 
              addDoc(collection(db, "appointments/"+values.appointmentDate, values.slot), {
                uid: user.uid,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                appointmentId: ref.id,
                appointmentName: values.appointmentName,
                symtoms: values.symptoms,
                status: 'pending',
                date: values.appointmentDate,
                created: serverTS
              }).then((appointmentRef) => {
                setModalData({
                  title: "Appointment booked",
                  message: "Appointment booked successfully. For " + values.appointmentDate + " in slot " + timeToSlotMapping[values.slot],
                  classname: "sucess"
                });
                setModalShow(true);
                setValues({
                  appointmentName: '',
                  appointmentDate: '',
                  symptoms: '',
                  formSlot: null
                });
                setFormDate();
              })
            });
          }
        ).finally(()=> {
          setIsSubmitting(false);
        })
      }
    } else {
      setValues({
        appointmentName: '',
        appointmentDate: '',
        symptoms: '',
        formSlot: null
      });
      setFormDate();
      setModalData({
        title: "Can't book appointment",
        message: "Please update your name on profile page.",
        classname: "error"
      });
      setModalShow(true);
      setIsSubmitting(false);
    }
  }
  

  return (
    <>
    {
      loading ? (
        <FullScreenLoaderComponent />
      ) : (
        <Form onSubmit={ handleSubmit } noValidate>
          <Form.Group className="mb-3">
            <Row>
              <Col md={12} lg={6}>
                <Form.Label>Appointment name</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder="Enter appointment name"
                  name="appointmentName"
                  onChange={handleChange}
                  value={values.appointmentName || ''}
                  className={`${errors.appointmentName && 'wrong-input'}`}
                  required
                />
                {
                errors.appointmentName && (<Form.Text className="text-danger">{errors.appointmentName}</Form.Text>)
                }
              </Col>
              <Col md={12} lg={6}>
                <Form.Label>Appointment date</Form.Label>
                <DatePicker
                  name="appointmentDate"
                  selected={formDate}
                  placeholderText="Select appointment day"
                  onChange={date => handleChangeDate(date)}
                  dateFormat='dd-MM-yyyy'
                  minDate={new Date()}
                  maxDate={new Date().setDate(new Date().getDate() + 5)}
                  className={`form-control ${errors.appointmentDate && 'wrong-input'}`}
                  filterDate={isWeekday}
                  autoComplete="off"
                />
                {
                errors.appointmentDate && (<Form.Text className="text-danger">{errors.appointmentDate}</Form.Text>)
                }
                
              </Col>
    
              <Col md={12} lg={12}>
                <div className="slots">
                  <div className="title">Choose a apoointment slot</div>
                  <label className="slot" htmlFor="slot_1">
                    <input type="radio" value="slot1" name="slot" id="slot_1" checked={values.slot === "slot1"} onChange={handleChange} disabled={slotStatusFlag.slot1}/>
                    <div className={`slot-content ${slotStatusFlag.slot1 ? "disabled" : ""}`}>
                      <div className="slot-details">
                        <span>09:00 AM</span>
                        <p>09:00 AM-12:00 PM</p>
                      </div>
                    </div>
                  </label>
    
                  <label className="slot" htmlFor="slot_2">
                    <input type="radio" value="slot2" name="slot" id="slot_2" checked={values.slot === "slot2"} onChange={handleChange} disabled={slotStatusFlag.slot2}/>
                    <div className={`slot-content ${slotStatusFlag.slot2 ? "disabled" : ""}`}>
                      <div className="slot-details">
                        <span>12:00 PM</span>
                        <p>12:00 PM-03:00 PM</p>
                      </div>
                    </div>
                  </label>
    
                  <label className="slot" htmlFor="slot_3">
                    <input type="radio" value="slot3" name="slot" id="slot_3" checked={values.slot === "slot3"} onChange={handleChange} disabled={slotStatusFlag.slot3}/>
                    <div className={`slot-content ${slotStatusFlag.slot3 ? "disabled" : ""}`}>
                      <div className="slot-details">
                        <span>03:00 PM</span>
                        <p>03:00 PM-06:00 PM</p>
                      </div>
                    </div>
                  </label>
    
                  <label className="slot" htmlFor="slot_4">
                    <input type="radio" value="slot4" name="slot" id="slot_4" checked={values.slot === "slot4"} onChange={handleChange} disabled={slotStatusFlag.slot4}/>
                    <div className={`slot-content ${slotStatusFlag.slot4 ? "disabled" : ""}`}>
                      <div className="slot-details">
                        <span>06:00 PM</span>
                        <p>06:00 PM-09:00 PM</p>
                      </div>
                    </div>
                  </label>
                </div>
                {
                errors.slot && (<Form.Text className="text-danger">{errors.slot}</Form.Text>)
                }
              </Col>
    
              <Col md={12} lg={12}>
                <Form.Label>Symptoms</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  autoComplete="off"
                  name="symptoms"
                  onChange={handleChange}
                  value={values.symptoms || ''}
                  className={`${errors.symptoms && 'wrong-input'}`}
                  required
                />
                {
                errors.symptoms && (<Form.Text className="text-danger">{errors.symptoms}</Form.Text>)
                }
                
              </Col>
            </Row>
          </Form.Group>
    
          <button type="submit" className="primary-button button-lg" disabled={isSubmitting}>
            { 
            isSubmitting ? 
            'Booking Appointment...' : 'Book Appointment'}
          </button>
          <VerticalCenteredModalComponent
            data={modalData}
            show={modalShow}
            onHide={
              () => {
                setModalShow(false); 
                navigate("/profile", { replace: true });
              }
            }
          />
        </Form>
      )
    }
    </>
  );
};

export default AppointmentForm;
