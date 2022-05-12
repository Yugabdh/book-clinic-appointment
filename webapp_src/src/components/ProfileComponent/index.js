import React from 'react';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import FullScreenLoaderComponent from '../FullScreenLoaderComponent';

import logoColor from '../../assets/img/png/tooth-color.png';

const ProfileComponent = ({user, loading}) => {

  return(
    <Container>
      <Row>
        <Col lg={12}>
        <div className="profile-wrapper">	
          <div className="profile p-3">
            {loading ? (
              <FullScreenLoaderComponent />
            ) : (
              <>
                <img src={logoColor} className="thumbnail" alt="profile" />
                {user? <h3 className="name">{user.fullName}</h3>: ''}
                <p className="description">{user? user.phoneNumber: ''}</p>
                <Link to="/profile" className="primary-button">Edit Profile</Link>
              </>
            )}
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
