import React from 'react';
import Container from 'react-bootstrap/Container';

const ServicesComponent = ({title, content}) => {
  return (
    <section className="section-wrapper">
      <div>
        <Container className="px-md-3 px-sm-0 title-wrapper">
          <h1>{ title }</h1>
        </Container>
        <Container className="px-md-3 px-sm-0 content">
            { content }
        </Container>
      </div>
    </section>
  );
};

export default ServicesComponent;
