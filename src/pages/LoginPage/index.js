import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import logoColor from '../../assets/img/png/tooth-color.png';
import { makeVisible } from '../../redux/navbarTransparent';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  });

  return (
    <section className="image-form-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={9}>
            <Card className="shadow-lg o-hidden border-0 my-1">
              <Card.Body className="p-0">
                <Row className="no-gutters">
                  <Col lg={6} className="d-none d-lg-flex img-wrapper">
                    <div className="d-flex flex-column justify-content-center p-5">
                      <div className="d-flex justify-content-center">
                        <img src={logoColor} alt="logo" className="logo"/>
                      </div>
                      <div className="text-wrapper pt-4 text-center">
                        <h2>Raghul Family Dental</h2>
                        <p>Why To Smile When You Can Laugh</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="p-5 form-container">
                      <div className="text-center">
                        <h4 className="mb-4">Welcome back!</h4>
                      </div>
                      <LoginForm />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;
