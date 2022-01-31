import { useState, useEffect } from 'react';

const useForm = (validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startRequest, setStartRequest] = useState(false);
  const [OTPRequested, setOTPRequested] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (!startRequest) {
        setStartRequest(true);
      }
      if (values.formPassword) {
        if (values.formPassword.length === 6) {
          setIsValid(true);
        }
      }
    }
  }, [values, errors, isSubmitting, startRequest]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values, OTPRequested));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    OTPRequested,
    setOTPRequested,
    startRequest,
    setStartRequest,
    isValid,
  }
};

export default useForm;