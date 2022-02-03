import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logoColor from '../../assets/img/png/tooth-color.png';

const ProfileComponent = (props) => {

  return(
    <Container>
      <Row>
        <Col lg={12}>
        <div className="profile-wrapper">	
          <div className="profile p-3">
            <img src={logoColor} className="thumbnail" alt="profile" />
            {props.userSlice? <h3 className="name">{props.userSlice.userData.fullName}</h3>: ''}
            <p className="description">{props.phoneNumber}</p>
            <Link to="/profile" className="primary-button">Edit Profile</Link>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
