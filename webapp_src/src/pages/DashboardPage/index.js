import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeVisible } from '../../redux/navbarTransparent';
import useGetUserData from '../../hooks/useGetUserData';

import AppointmentWrapper from './AppointmentWrapper';
import ProfileComponent from '../../components/ProfileComponent';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { loading, user, } = useGetUserData();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  return(
    <section className="dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <ProfileComponent user={user} loading={loading} />
          </Col>
          <Col sm={12} lg={8} className="pt-5 pt-lg-0">
          <CardComponentWithHeading 
            heading={
              <>
                <div className="d-flex justify-content-between align-items-center header">
                  <h3 className="card-heading">Appointments</h3>
                  <Link to="/appointments" className="primary-button d-none d-md-block">New Appointment</Link>
                </div>
              </>
            }
            children={<AppointmentWrapper user={user} loading={loading} />}
          />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
