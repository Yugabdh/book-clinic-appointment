import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PhoneNumberFilter from './PhoneNumberFilter';
import UserNameFilter from './UserNameFilter';
import Accordion from 'react-bootstrap/Accordion';

import AppointmentsList from './AppointmentsList';
import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent';
import TodaysAppointments from './TodaysAppointments';

const PatientFilterComponent = ({setPatient, setLoading, loading}) => {

  const [patientList, setPatientList] = useState([]);

  return (
    <Container>
      <Row>
        <Col lg={12}>
        <div className="filter-wrapper">	
          <div className="filter p-3">
            <PhoneNumberFilter setPatientList={setPatientList} setLoading={setLoading} />
            <UserNameFilter setPatientList={setPatientList} setLoading={setLoading} />
            <Accordion className="mt-5" defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Search Result</Accordion.Header>
                <Accordion.Body>
                  <div className="appointments-list">
                    {
                      loading?
                      <FullScreenLoaderComponent />
                      : patientList.length > 0?
                      <AppointmentsList setPatient={setPatient} appoinmentList={patientList} /> : <p>Search Result</p>
                    }
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Today's Appointments</Accordion.Header>
                <Accordion.Body>
                  <TodaysAppointments setPatient={setPatient} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PatientFilterComponent;