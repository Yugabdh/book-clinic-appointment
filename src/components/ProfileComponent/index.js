import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logoColor from '../../assets/img/png/tooth-color.png';

const ProfileComponent = () => {
  return(
    <Container>
      <Row>
        <Col lg={12}>
        <div className="profile-wrapper">	
          <div className="profile p-3">
            <img src={logoColor} className="thumbnail" />
            <h3 className="name">Beverly Little</h3>
            <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aliquam aliquid porro!</p>
            <Link to="/profile" className="primary-button">Edit Profile</Link>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
