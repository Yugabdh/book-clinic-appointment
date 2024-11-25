import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeVisible } from '../../redux/navbarTransparent';

import PatientFilterComponent from './PatientFilterComponent';
import PatientDataComponent from './PatientDataComponent';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const DoctorDashboardPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(false);

  return(
    <section className="doctor-dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <PatientFilterComponent setPatient={setPatient} setLoading={setLoading} loading={loading} />
          </Col>
          <Col sm={12} lg={8} className="pt-5 pt-lg-0">
          <CardComponentWithHeading 
            heading={<h3 className="card-heading">Patient History</h3>}
            children={<PatientDataComponent patient={patient} />}
          />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default DoctorDashboardPage;