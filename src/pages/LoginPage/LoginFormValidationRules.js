export default function validate(values) {
  let errors = {};

  if (!values.formTelNumber) {
    errors.formTelNumber = "Please enter contact number.";
  } else if (!/[0-9]{10}/.test(values.formTelNumber)) {
    errors.formTelNumber = "Mobile Number should be of 10 digits.";
  }

  if (!values.formPassword) {
    errors.formPassword = "Password required.";
  } else if (values.formPassword.length < 8) {
    errors.formPassword = "Password must be 8 or more characters.";
  }

  return errors;
};