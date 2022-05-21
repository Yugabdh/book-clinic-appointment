import React from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {
  query,
  getDocs,
  collection,
  where
} from "firebase/firestore";

import {
  db,
} from '../../firebase';

import useForm from '../../hooks/useForm';

import validate from './PhoneFilterFormValidationRules';

const PhoneNumberFilter = ({setPatientList, setLoading}) => {

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setIsSubmitting,
  } = useForm(search, validate);

  async function search() {
    setLoading(true);
    const phoneNumber = "+91"+values.phoneNumber;
    const q = query(collection(db, "users"), where("phoneNumber", "==", phoneNumber));
    getDocs(q)
      .then(docs => {
        if(docs.docs.length>0) {
          let data = [];
          docs.docs.forEach((doc) => {
            data.push(doc.data())
          });
          setPatientList(data);
        } else {
          setErrors({phoneNumber: "No patient found"})
        }
      }).finally(() => {
        setIsSubmitting(false);
        setLoading(false);
      });
  }

  return (
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-1">
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
      </Form.Group>
      <button type="submit" className="primary-button button-lg" disabled={isSubmitting}>{isSubmitting? "Searching...": "Search by Phone number"}</button>
    </Form>
  );
}

export default PhoneNumberFilter;