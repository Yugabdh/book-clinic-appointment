import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeVisible } from '../../redux/navbarTransparent';
import { SET_UID, getUserData } from '../../redux/userSlice';

import { useAuth } from '../../contexts/AuthContext';

import AppointmentWrapper from './AppointmentWrapper';
import ProfileComponent from '../../components/ProfileComponent';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const DashboardPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const { currentUser } = useAuth();
  useEffect(() => {
    // Set UID
    dispatch(SET_UID(currentUser.uid));
    // get User Data
    dispatch(getUserData(currentUser));
  }, [currentUser.uid]);

  const userSlice = useSelector((state) => state.userSlice);

  return(
    <section className="dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <ProfileComponent phoneNumber={currentUser.phoneNumber} userSlice={userSlice}/>
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
            children={<AppointmentWrapper />}
          />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
