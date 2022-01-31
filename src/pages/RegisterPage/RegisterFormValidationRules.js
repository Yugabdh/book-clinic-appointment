export default function validate(values) {
  let errors = {};

  if (!values.formFirstName) {
    errors.formFirstName = "Please enter firstname.";
  }
  
  if (!values.formLastName) {
    errors.formLastName = "Please enter lastname.";
  }

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

  if (!values.formPasswordRe) {
    errors.formPasswordRe = "Password required.";
  } else if (values.formPasswordRe !== values.formPassword) {
    errors.formPasswordRe = "Password is not matching";
  }

  return errors;
};