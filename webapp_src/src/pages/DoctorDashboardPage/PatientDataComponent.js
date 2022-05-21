import React, { useState } from 'react';

import RichTextEditor from './RichTextEditor';
import HistoryComponent from './HistoryComponent';

const PatientDataComponent = ({patient}) => {

  const [viewToShow, setViewToShow] = useState('');

  return (
    <>
    {
      patient.uid? 
        <>
        <div className="m-3">
        <b>{patient.fullName}</b>
        <div className="d-flex justify-content-start view-btn-wrapper py-2">
          <button className="primary-button" onClick={() => setViewToShow("RichTextEditor")}>Add History</button>
          <button className="primary-button" onClick={() => setViewToShow("ViewHistory")}>View History</button>
        </div>
        </div>
        {
          viewToShow === "RichTextEditor"? <RichTextEditor patient={patient} />: ""
        }
        {
          viewToShow === "ViewHistory"? <HistoryComponent patient={patient} />: ""
        }
        
        </>
        : <div>No Patient Selected</div>
    }
    </>
  )
}

export default PatientDataComponent;