import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';

const AppointmentForm = () => {
  const dispatch = useDispatch();
  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [bookingAppointment, setBookingAppointment] = useState(false);

  const [formDate, setFormDate] = useState();

  const userSlice = useSelector((state) => state.userSlice);

  const converDate = (date) => {
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
    formAppointmentName: '',
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
    console.log(timeToSlotMapping[values.formSlot]);
    console.log(values);
    console.log(userSlice.uid);
    if (userSlice.uid) {
      if (userSlice.userData) {
        if (userSlice.userData.fullName) {
          const docRef = await addDoc(collection(db, "users/"+userSlice.uid+"/appointments/"+values.formAppointmentDate, "appointments"), {
            appointmentName: values.formAppointmentName,
            date: values.formAppointmentDate,
            slot: values.formSlot,
            symtoms: values.formSymptoms,
            status: 'pending'
          }).then((ref) => {
            addDoc(collection(db, "appointments/"+values.formAppointmentDate, values.formSlot), {
              uid: userSlice.uid,
              appointmentId: ref.id,
              appointmentName: values.formAppointmentName,
              symtoms: values.formSymptoms
            }).then((appointmentRef) => {
              setModalData({
                title: "Appointment booked",
                message: "Appointment booked successfully. For " + values.formAppointmentDate + " in slot " + timeToSlotMapping[values.formSymptoms],
                classname: "sucess"
              });
              setModalShow(true);
              setBookingAppointment(false);
            })
          });
        }
      }
    }
  }

  // const updateFirebase = useCallback(() => {

  // }, [values, dispatch]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitting(false);
      updateFirebase();
    }
  }, [errors, isSubmitting, updateFirebase]);

  function validate(values) {
    let errors = {};
    if (!values.formAppointmentName) {
      errors.formAppointmentName = "Appointment name is required.";
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

  const handleChangeDate = (date) => {
    const dateInFormate = converDate(date);
    setValues(values => ({ ...values, 'formAppointmentDate': dateInFormate}))
    setFormDate(date);
  }

  return (
    <>
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-3">
        <Row>
          <Col md={12} lg={6}>
            <Form.Label>Appointment name</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter appointment name"
              name="formAppointmentName"
              onChange={handleChange}
              value={values.formAppointmentName || ''}
              className={`${errors.formAppointmentName && 'wrong-input'}`}
              required
            />
            {
            errors.formAppointmentName && (<Form.Text className="text-danger">{errors.formAppointmentName}</Form.Text>)
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
            />
            {
            errors.formAppointmentDate && (<Form.Text className="text-danger">{errors.formAppointmentDate}</Form.Text>)
            }
            
          </Col>

          <Col md={12} lg={12}>
            <div className="slots">
              <div className="title">Choose a apoointment slot</div>
              <label className="slot" htmlFor="slot_1">
                <input type="radio" value="slot1" name="formSlot" id="slot_1" checked={values.formSlot === "slot1"} onChange={handleChange} />
                <div className="slot-content">
                  <div className="slot-details">
                    <span>09:00 AM</span>
                    <p>09:00 AM-12:00 PM</p>
                  </div>
                </div>
              </label>

              <label className="slot" htmlFor="slot_2">
                <input type="radio" value="slot2" name="formSlot" id="slot_2" checked={values.formSlot === "slot2"} onChange={handleChange} />
                <div className="slot-content">
                  <div className="slot-details">
                    <span>12:00 PM</span>
                    <p>12:00 PM-03:00 PM</p>
                  </div>
                </div>
              </label>

              <label className="slot" htmlFor="slot_3">
                <input type="radio" value="slot3" name="formSlot" id="slot_3" checked={values.formSlot === "slot3"} onChange={handleChange} />
                <div className="slot-content">
                  <div className="slot-details">
                    <span>03:00 PM</span>
                    <p>03:00 PM-06:00 PM</p>
                  </div>
                </div>
              </label>

              <label className="slot" htmlFor="slot_4">
                <input type="radio" value="slot4" name="formSlot" id="slot_4" checked={values.formSlot === "slot4"} onChange={handleChange} />
                <div className="slot-content">
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
        onHide={() => setModalShow(false)}
      />
    </Form>
    </>
  );
};

export default AppointmentForm;
