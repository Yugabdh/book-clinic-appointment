export default function validate(values, OTPFlag) {
  let errors = {};

  if (!values.formTelNumber) {
    errors.formTelNumber = "Please enter contact number.";
  } else if (!/^\+91[0-9]{10}$/.test(values.formTelNumber)) {
    errors.formTelNumber = "Mobile Number should start with +91 and must have 10 digits.";
  }

  if (OTPFlag === true) {
    if (!values.formPassword) {
      errors.formPassword = "OTP required.";
    } else if (values.formPassword.length !== 6) {
      errors.formPassword = "OTP must be 6 characters.";
    }
  }

  return errors;
};