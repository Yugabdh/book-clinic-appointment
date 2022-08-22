import React from 'react';

import Form from 'react-bootstrap/Form';

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

import validate from './UserNameFilterFormValidationRules';

const UserNameFilter = ({setPatientList, setLoading}) => {
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
    const q = query(collection(db, "users"), where("fullNameLower", ">=", values.username.toLowerCase()), where("fullNameLower", "<=", values.username.toLowerCase()+ '\uf8ff'));
    getDocs(q)
      .then(docs => {
        if(docs.docs.length>0) {
          let data = [];
          docs.docs.forEach((doc) => {
            data.push(doc.data())
          });
          setPatientList(data);
        } else {
          setErrors({username: "No patient found"})
        }
      }).finally(() => {
        setIsSubmitting(false);
        setLoading(false);
      });
  }

  return (
    <Form onSubmit={ handleSubmit } noValidate className="mt-5">
      <Form.Group className="mb-1">
        <Form.Control
          autoComplete="off"
          type="text"
          placeholder="Enter patient name"
          name="username"
          onChange={handleChange}
          value={values.username || ''}
          className={`${errors.username && 'wrong-input'}`}
          aria-describedby="phoneNumber"
          required
        />
        {
        errors.username && (<Form.Text className="text-danger">{errors.username}</Form.Text>)
        }
      </Form.Group>
      <button type="submit" className="primary-button button-lg" disabled={isSubmitting}>{isSubmitting? "Searching...": "Search by Patient Name"}</button>
    </Form>
  );
}

export default UserNameFilter;