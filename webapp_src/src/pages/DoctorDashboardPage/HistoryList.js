import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import DOMPurify from 'dompurify';

const createMarkup = (html) => {
  return  {
    __html: DOMPurify.sanitize(html)
  }
}

const HistoryList = ({notes}) => notes.map((note, idx) => {
  return (
    <Accordion.Item eventKey={idx} key={idx}>
      <Accordion.Header>{note.id}</Accordion.Header>
      <Accordion.Body>
        <div className="preview" dangerouslySetInnerHTML={createMarkup(note.note)}></div>
        <div className="pills-wrapper">
          {
            Array.isArray(note.medicineList) ? note.medicineList.map((item, idx) => (
              <div className="pill-container" key={idx}>
                <div className="pills-container-main">
                  <div className="pill">{item}</div>
                </div>
              </div>
            )): null
          }
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
});

export default HistoryList