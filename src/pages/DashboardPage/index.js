import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { makeVisible } from '../../redux/navbarTransparent';

import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const dispatch = useDispatch();
  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  });

  const { logOut } = useAuth();

  async function handleSignOut() {
    try {
      await logOut();
      navigate("/", { replace: true });
    } catch {
      console.log("error");
    }
  }
  const navigate = useNavigate();

  return(
    <section style={{height: '100vh', paddingTop: '140px'}}>
      <Container>
        <Row className="justify-content-center">
          <Col>
          <h1 className="align-self-center">Dashboard</h1>
          <button className="btn btn-primary" onClick={ handleSignOut }>Log out</button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
