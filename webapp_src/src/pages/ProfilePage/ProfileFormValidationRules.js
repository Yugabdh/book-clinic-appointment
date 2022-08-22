export default function validate(values) {
  let errors = {};
  if (!values.firstName) {
    errors.firstName = "Firstname is required.";
  } else if (values.firstName.length > 50) {
    errors.firstName = "Firstname cannot be more than 35 characters.";
  } else if (!(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(values.firstName))) {
    errors.firstName = "Please provide proper name";
  }
  if (!values.lastName) {
    errors.lastName = "Lastname is required.";
  } else if (!(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(values.lastName))) {
    errors.lastName = "Please provide proper name";
  }
  if (!values.age) {
    errors.age = "Age is required.";
  } else if (values.age <= 0) {
    errors.age = "Please enter proper age.";
  } else if (values.age >= 90) {
    errors.age = "Please enter proper age.";
  }
  if (!values.gender) {
    errors.gender = "Gender is required.";
  }
  return errors;
};