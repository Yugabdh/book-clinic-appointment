export default function validate(values) {
  let errors = {};
  if (!values.firstName) {
    errors.firstName = "Firstname is required.";
  }
  if (!values.lastName) {
    errors.lastName = "Lastname is required.";
  }
  if (!values.age) {
    errors.age = "Age is required.";
  } else if (values.age <= 0) {
    errors.age = "Please enter proper age.";
  }
  if (!values.gender) {
    errors.gender = "Gender is required.";
  }
  return errors;
};