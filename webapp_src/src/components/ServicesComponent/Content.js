import React from 'react';
import Col from 'react-bootstrap/Col';

const Content = (props) => props.services.map((service) => {
  return (
    <Col key={service.id} sm={12} md={6} lg={4}>
      <div className="service-item">
        <div className="service-icon">
          <img src={`${process.env.PUBLIC_URL}`+service.logo} alt={service.title} />
        </div>
        <div className="service-content">
          <h5>{service.title}</h5>
          <p>{service.details}</p>
        </div>
      </div>
    </Col>
  );
});

export default Content;
