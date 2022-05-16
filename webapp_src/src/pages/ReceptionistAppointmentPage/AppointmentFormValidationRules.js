export default function validate(values) {
  let errors = {};
  if (!values.patientName) {
    errors.patientName = "Appointment name is required.";
  }

  if(!values.appointmentDate) {
    errors.appointmentDate = "Appointment date is required.";
  }

  if(!values.symptoms) {
    errors.symptoms = "Symptoms is required.";
  }
  if(!values.slot) {
    errors.slot = "Slot is required.";
  }
  return errors;
};