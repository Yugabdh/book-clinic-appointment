import React from 'react';
import Container from 'react-bootstrap/Container';

const CallToActionComponent = () => {
  return (
    <section className="call-to-action">
      <div className="d-flex justify-content-center align-items-center mask">
          <Container className="call-to-action-wrapper">
            <div className="call">
                <p className="call-text">Sign Up To Book Appoitnment</p>
            </div>
            <div className="action"><a href="/" className="btn primary-button button-lg">Sign Up!</a></div>
          </Container>
      </div>
    </section>
  );
};

export default CallToActionComponent;
