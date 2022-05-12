import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeTransparent } from '../../redux/navbarTransparent';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // trigger on component mount
  useEffect(() => {
    dispatch(makeTransparent());
  }, [dispatch]);
  

  return (
    <section className="notfoundpage view">
      <div className="d-flex justify-content-center align-items-center mask hero-header">
        <Container className="px-md-3 px-sm-0">
          <Row className="hero-header-content align-items-center">
            <Col lg={12} className="text-center">
                <h1 className="hero-header-title">Page Not Found <br /><span className="highlight">Ragul Family Dental</span></h1>
                <p className="hero-header-description">Ragul Family Dental clinic provide high quality dental treatment with affordable payment plans</p>
                <div className="hero-header-call-to-action">
                  <button className="btn primary-button button-lg" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  )
}

export default NotFoundPage;