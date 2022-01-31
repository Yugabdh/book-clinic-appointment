import React from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import useForm from "./useForm";
import validate from './LoginFormValidationRules';

const LoginForm = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(validate);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3" controlId="formTelNumber">
        <Form.Control
          autoComplete="off"
          type="tel"
          pattern="[0-9]{10}"
          placeholder="Enter contact number"
          name="formTelNumber"
          onChange={handleChange}
          value={values.formTelNumber || ''}
          className={`${errors.formTelNumber && 'wrong-input'}`}
          required
        />
        {
        errors.formTelNumber && (<Form.Text className="text-danger">{errors.formTelNumber}</Form.Text>)
        }
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
        type="password"
        placeholder="Enter password"
        name="formPassword"
        onChange={handleChange}
        value={values.formPassword || ''}
        className={`${errors.formPassword && 'wrong-input'}`}
        required
      />
      {
      errors.formPassword && (<Form.Text className="text-danger">{errors.formPassword}</Form.Text>)
      }
      </Form.Group>

      <hr />

      <button type="submit" className="primary-button button-lg">Login</button>
      <div className="d-flex justify-content-center pt-3 bottom-link">
        <Link to="/register">Create an account !</Link>
      </div>
    </Form>
  );
};

export default LoginForm;