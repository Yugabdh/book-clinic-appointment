import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CardComponentWithHeading = (props) => {
  return(
    <Container>
      <Row>
        <Col lg={12}>
          <div className="card-heading-wrapper">
            <div className="card-body p-3">
              { props.heading }
              <hr />
              <div className="card-heading-content">
                { props.children }
              </div>
            </div>
          </div>
        </Col>
      </Row>
  </Container>
  );
};

export default CardComponentWithHeading;
