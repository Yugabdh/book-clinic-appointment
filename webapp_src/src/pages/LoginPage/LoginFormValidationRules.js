export default function validate(values) {
  let errors = {};
  if (!values.phoneNumber) {
    errors.phoneNumber = "Please enter contact number.";
  } else if (!/^[0-9]{10}$/.test(values.phoneNumber)) {
    console.log(values.phoneNumber);
    errors.phoneNumber = "Mobile Number must have 10 digits.";
  }
  return errors;
};