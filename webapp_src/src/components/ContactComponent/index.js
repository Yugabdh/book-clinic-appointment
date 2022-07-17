import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SectionComponent from '../SectionComponent/';

const Content = () => {

  return (
    <Container className="contact-wrapper">
      <Row>
        <Col md={12} lg={6}>
          <div className="contact-item">
            <h5>Contact Number</h5>
            <p>+91 8898166023</p>
          </div>
          <div className="contact-item">
            <h5>Contact Address</h5>
            <p>400706, Sector 44A, Seawoods, Navi Mumbai, Maharashtra 400706</p>
          </div>
        </Col>
        <Col md={12} lg={6}>
          <iframe
            title="contact-address"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.129893358775!2d73.01009111479856!3d19.013997087123478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3996fe09f45%3A0x294645a8c395cf56!2sRagul%20Family%20Dental!5e0!3m2!1sen!2sin!4v1646128887067!5m2!1sen!2sin" 
            className="google-maps-ifram"
            loading="lazy"
            allowFullScreen></iframe>
        </Col>
      </Row>
    </Container>
  );
}

const ContactComponent = () => {
  const content = <Content />;

  return (
    <SectionComponent title="Contact us" content={content} />
  );
};

export default ContactComponent;
