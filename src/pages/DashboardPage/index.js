import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { makeVisible } from '../../redux/navbarTransparent';

import { useAuth } from '../../contexts/AuthContext';

import ProfileComponent from '../../components/ProfileComponent';

const DashboardPage = () => {
  const dispatch = useDispatch();
  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  });

  return(
    <section className="dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <ProfileComponent />
          </Col>
          <Col sm={12} lg={8}>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
