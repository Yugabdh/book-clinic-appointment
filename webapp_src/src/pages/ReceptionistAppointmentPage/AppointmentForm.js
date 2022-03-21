import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { db } from '../../firebase';
import { addDoc, setDoc, collection, serverTimestamp, onSnapshot, query, doc } from "firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';

const AppointmentForm = () => {
  const navigate = useNavigate();
  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [bookingAppointment, setBookingAppointment] = useState(false);
  const [slotdata, setSlotData] = useState({
    slot1_counter: 0,
    slot2_counter: 0,
    slot3_counter: 0,
    slot4_counter: 0
  });

  // contact number search States
  const [isSearching, setIsSearching] = useState(false);
  const [searchFinished, setSearchFinished] = useState(false);

  // contact search function
  const searchNumber = () => {
    if(values.phoneNumber) {
      let phoneNumber = values.phoneNumber;
      if (!values.formTelNumber) {
        errors.formTelNumber = "Please enter contact number.";
      } else if (!/^[0-9]{10}$/.test(values.formTelNumber)) {
        console.log(values.formTelNumber);
        errors.formTelNumber = "Mobile Number must have 10 digits.";
      } else {
        setErrors({});
        console.log("Calling generateRecaptcha");
      }
    }
  } 
  
  const [slotStatusFlag, setSlotStatusFlag] = useState({ slot1: false, slot2: false, slot3: false, slot4: false});

  const [formDate, setFormDate] = useState();

  const userSlice = useSelector((state) => state.userSlice);

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
  // Form inputs
  const [values, setValues] = useState({
    phoneNumber: '',
    formPatientName: '',
    formAppointmentDate: '',
    formSymptoms: '',
    formSlot: null
  });

  // weekday checker
  const isWeekday = (date) => {
    const day = new Date(date).getDate();
    return day !== 0 && day !== 6;
  };

  // Errors values for input
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function updateFirebase() {
    setBookingAppointment(true);

    const timeToSlotMapping = {
      "slot1": "09:00 AM-12:00 PM",
      "slot2": "12:00 PM-03:00 PM",
      "slot3": "03:00 PM-06:00 PM",
      "slot4": "06:00 PM-09:00 PM",
    }
    if (!(slotdata[values.formSlot+"_counter"] >= 4)) {
      slotdata[values.formSlot+"_counter"] += 1;
      const slotcounterRef = doc(db, "appointments", values.formAppointmentDate);
      console.log(slotdata)
      await setDoc(slotcounterRef, {
        ...slotdata
      }).then(
        (slotupdateRef) => {
          const serverTS = serverTimestamp();
          addDoc(collection(db, "appointments/"+values.formAppointmentDate, values.formSlot), {
            uname: values.formPatientName,
            unumber: values.phoneNumber,
            appointmentId: '',
            symtoms: values.formSymptoms,
            status: 'pending',
            created: serverTS
          }).then((appointmentRef) => {
            setModalData({
              title: "Appointment booked",
              message: "Appointment booked successfully. For " + values.formAppointmentDate + " in slot " + timeToSlotMapping[values.formSlot],
              classname: "sucess"
            });
            setModalShow(true);
            setBookingAppointment(false);
            setValues({
              formAppointmentName: '',
              formAppointmentDate: '',
              formSymptoms: '',
              formSlot: null
            });
            setFormDate();
          })
        }
      )
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitting(false);
      updateFirebase();
    }
  }, [errors, isSubmitting]);

  function validate(values) {
    let errors = {};
    if (!values.formPatientName) {
      errors.formPatientName = "Appointment name is required.";
    }

    if(!values.formAppointmentDate) {
      errors.formAppointmentDate = "Appointment date is required.";
    }

    if(!values.formSymptoms) {
      errors.formSymptoms = "Symptoms is required.";
    }
    if(!values.formSlot) {
      errors.formSlot = "Slot is required.";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  // Handle changes of date field converting it to valid firestore doc id
  const handleChangeDate = (date) => {
    const dateInFormate = convertDate(date);
    setValues(values => ({ ...values, 'formAppointmentDate': dateInFormate}))
    setFormDate(date);
  }

  // slots counter state handler
  useEffect(() => {
    // unselect if any value is selected
    setValues({...values, formSlot: null});
    setSlotStatusFlag({ slot1: false, slot2: false, slot3: false, slot4: false });
    if (values.formAppointmentDate) {
      const q = query(doc(db, "appointments/"+values.formAppointmentDate));
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

          setSlotData({...data})
        }
      });

      return unsubscribe;
    }
  }, [values.formAppointmentDate]);

  return (
    <>
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group>
        <Form.Label>Contact Number</Form.Label>
        <Row>
          <Col md={12} lg={10}>
            <InputGroup>
              <InputGroup.Text className="country-span">+91</InputGroup.Text>
              <Form.Control
                autoComplete="off"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Enter contact number"
                name="phoneNumber"
                value={values.phoneNumber || ''}
                className={`${errors.phoneNumber && 'wrong-input'}`}
                onChange={handleChange}
                required
                aria-describedby="phoneNumber"
              />
            </InputGroup>
            {
            errors.phoneNumber && (<Form.Text className="text-danger">{errors.phoneNumber}</Form.Text>)
            }
          </Col>
          <Col md={12} lg={2}>
            <button type="button" onClick={ searchNumber } className="primary-button search-btn">
              Search
            </button>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
          <Col md={12} lg={6}>
            <Form.Label>Patient name</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter patient name"
              name="formPatientName"
              onChange={handleChange}
              value={values.formPatientName || ''}
              className={`${errors.formPatientName && 'wrong-input'}`}
              required
            />
            {
            errors.formPatientName && (<Form.Text className="text-danger">{errors.formPatientName}</Form.Text>)
            }
          </Col>
          <Col md={12} lg={6}>
            <Form.Label>Appointment date</Form.Label>
            <DatePicker
              name="formAppointmentDate"
              selected={formDate}
              placeholderText="Select appointment day"
              onChange={date => handleChangeDate(date)}
              dateFormat='dd-MM-yyyy'
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + 5)}
              className={`form-control ${errors.formAppointmentDate && 'wrong-input'}`}
              filterDate={isWeekday}
              autoComplete="off"
            />
            {
            errors.formAppointmentDate && (<Form.Text className="text-danger">{errors.formAppointmentDate}</Form.Text>)
            }
            
          </Col>

          <Col md={12} lg={12}>
            <div className="slots">
              <div className="title">Choose a apoointment slot</div>
              <label className="slot" htmlFor="slot_1">
                <input type="radio" value="slot1" name="formSlot" id="slot_1" checked={values.formSlot === "slot1"} onChange={handleChange} disabled={slotStatusFlag.slot1}/>
                <div className={`slot-content ${slotStatusFlag.slot1 ? "disabled" : ""}`}>
                  <div className="slot-details">
                    <span>09:00 AM</span>
                    <p>09:00 AM-12:00 PM</p>
                  </div>
                </div>
              </label>

              <label className="slot" htmlFor="slot_2">
                <input type="radio" value="slot2" name="formSlot" id="slot_2" checked={values.formSlot === "slot2"} onChange={handleChange} disabled={slotStatusFlag.slot2}/>
                <div className={`slot-content ${slotStatusFlag.slot2 ? "disabled" : ""}`}>
                  <div className="slot-details">
                    <span>12:00 PM</span>
                    <p>12:00 PM-03:00 PM</p>
                  </div>
                </div>
              </label>

              <label className="slot" htmlFor="slot_3">
                <input type="radio" value="slot3" name="formSlot" id="slot_3" checked={values.formSlot === "slot3"} onChange={handleChange} disabled={slotStatusFlag.slot3}/>
                <div className={`slot-content ${slotStatusFlag.slot3 ? "disabled" : ""}`}>
                  <div className="slot-details">
                    <span>03:00 PM</span>
                    <p>03:00 PM-06:00 PM</p>
                  </div>
                </div>
              </label>

              <label className="slot" htmlFor="slot_4">
                <input type="radio" value="slot4" name="formSlot" id="slot_4" checked={values.formSlot === "slot4"} onChange={handleChange} disabled={slotStatusFlag.slot4}/>
                <div className={`slot-content ${slotStatusFlag.slot4 ? "disabled" : ""}`}>
                  <div className="slot-details">
                    <span>06:00 PM</span>
                    <p>06:00 PM-09:00 PM</p>
                  </div>
                </div>
              </label>
            </div>
            {
            errors.formSlot && (<Form.Text className="text-danger">{errors.formSlot}</Form.Text>)
            }
          </Col>

          <Col md={12} lg={12}>
            <Form.Label>Symptoms</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              autoComplete="off"
              name="formSymptoms"
              onChange={handleChange}
              value={values.formSymptoms || ''}
              className={`${errors.formSymptoms && 'wrong-input'}`}
              required
            />
            {
            errors.formSymptoms && (<Form.Text className="text-danger">{errors.formSymptoms}</Form.Text>)
            }
            
          </Col>
        </Row>
      </Form.Group>

      <button type="submit" className="primary-button button-lg" disabled={bookingAppointment}>
        { 
        bookingAppointment ? 
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />: 'Book Appointment'}
      </button>
      <VerticalCenteredModalComponent
        data={modalData}
        show={modalShow}
        onHide={
          () => {
            setModalShow(false); 
            navigate("/dashboard", { replace: true });
          }
        }
      />
    </Form>
    </>
  );
};

export default AppointmentForm;
