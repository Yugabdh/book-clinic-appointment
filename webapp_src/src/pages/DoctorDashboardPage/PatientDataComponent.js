import React from 'react'

const PatientDataComponent = ({patientUID}) => {
  return (
    <>
    {
      patientUID? 
        <div>{patientUID}</div>
        : <div>No Patient Selected</div>
    }
    </>
  )
}

export default PatientDataComponent;