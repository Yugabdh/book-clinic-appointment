import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {
  db,
} from '../../firebase';

import {
  setDoc,
  doc
} from "firebase/firestore";

import useForm from '../../hooks/useForm';
import useGetUserData from '../../hooks/useGetUserData';

import { setUser } from '../../redux/user';

import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent';
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import validate from './ProfileFormValidationRules';

const ProfileForm = () => {
  const dispatch = useDispatch();

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    isSubmitting,
    setIsSubmitting,
  } = useForm(updateFirebase, validate);


  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const { loading, user, } = useGetUserData();

  async function updateFirebase() {
    setDoc(doc(db, "users", user.uid), {
      firstName: values.firstName,
      lastName: values.lastName,
      fullName: values.firstName + " " + values.lastName,
      fullNameLower: values.firstName.toLowerCase() + " " + values.lastName.toLowerCase(),
      age: values.age,
      gender: values.gender,
    }, { merge: true })
    .then(() => {
      dispatch(setUser({
        ...user,
        ...values,
        fullName: values.firstName + " " + values.lastName,
      }));
    });

    setModalData({
      title: "Profile updated",
      message: "Profile updated successfully.",
      classname: "sucess"
    });
    setModalShow(true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
    });
  }, [])

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
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder="Enter firstname"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName || ''}
                  className={`${errors.firstName && 'wrong-input'}`}
                  required
                />
                {
                errors.firstName && (<Form.Text className="text-danger">{errors.firstName}</Form.Text>)
                }
              </Col>
              <Col md={12} lg={6}>
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder="Enter lastname"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName || ''}
                  className={`${errors.lastName && 'wrong-input'}`}
                  required
                />
                {
                errors.lastName && (<Form.Text className="text-danger">{errors.lastName}</Form.Text>)
                }
              </Col>
              <Col md={12} lg={6}>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="number"
                  placeholder="Age"
                  name="age"
                  onChange={handleChange}
                  value={values.age || ''}
                  className={`${errors.age && 'wrong-input'}`}
                  required
                />
                {
                errors.age && (<Form.Text className="text-danger">{errors.age}</Form.Text>)
                }
              </Col>
              <Col md={12} lg={6}>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Select gender"
                  autoComplete="off"
                  name="gender"
                  onChange={handleChange}
                  value={values.gender || ''}
                  className={`${errors.gender && 'wrong-input'} form-select-custom`}
                  required
                >
                  <option>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                {
                errors.gender && (<Form.Text className="text-danger">{errors.gender}</Form.Text>)
                }
              </Col>
            </Row>
          </Form.Group>

          <button type="submit" className="primary-button button-lg" disabled={isSubmitting} >{isSubmitting ? 'Loading…' : 'Update profile'}</button>

          {/* This modal will show up on error or otp send */}
          <VerticalCenteredModalComponent
            data={modalData}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Form>
        )
      }
    </>
  );
};

export default ProfileForm;