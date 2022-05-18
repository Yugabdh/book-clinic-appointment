export default function validate(values) {
  let errors = {};
  if (!values.username) {
    errors.username = "Please enter patient name.";
  }
  return errors;
};