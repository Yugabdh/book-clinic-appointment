import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import useForm from '../../hooks/useForm';

import validate from './PatientFilterFormValidationRules';

const PatientFilterComponent = ({setPatientUID}) => {

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useForm(search, validate);

  function search() {
    console.log('search called');
  }
  
  return (
    <Container>
      <Row>
        <Col lg={12}>
        <div className="filter-wrapper">	
          <div className="filter p-3">
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
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PatientFilterComponent;