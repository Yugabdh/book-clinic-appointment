export default function validate(values) {
  let errors = {};
  if (!values.medicine) {
    errors.medicine = "Please add medicine.";
  }
  return errors;
};