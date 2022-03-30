import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AutofillAnswerModalComponent = (props) => {
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
      <Modal.Footer>
        <Button variant="primary" onClick={
            () => {
              props.handleClose(false);
              props.handlesubmit()
            }
          } >Yes</Button>
        <Button variant="secondary" onClick={() => props.handleClose(false)}>No</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default AutofillAnswerModalComponent;
