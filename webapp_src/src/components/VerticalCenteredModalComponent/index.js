import React from 'react';

import Modal from 'react-bootstrap/Modal';

const VerticalCenteredModalComponent = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      className={`vc-modal ${props.data? props.data.classname : ''}`}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${props.data? props.data.title : '' }`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {`${props.data? props.data.message : '' }`}
        </p>
      </Modal.Body>
    </Modal>
    );
};

export default VerticalCenteredModalComponent;
