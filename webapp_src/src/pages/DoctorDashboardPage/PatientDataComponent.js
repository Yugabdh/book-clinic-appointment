import React from 'react';

import RichTextEditor from './RichTextEditor';

const PatientDataComponent = ({patientUID}) => {
  return (
    <>
    {
      patientUID? 
        <>
        <RichTextEditor patientUID={patientUID} />
        </>
        : <div>No Patient Selected</div>
    }
    </>
  )
}

export default PatientDataComponent;