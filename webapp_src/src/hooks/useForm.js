import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    } else if (Object.keys(errors).length > 0 && isSubmitting) {
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    if(event.target.type === 'checkbox') {
      if (event.target.checked === true) {
        setValues(values => ({ ...values, [event.target.name]: true }));
      } else {
        setValues(values => ({ ...values, [event.target.name]: false }));
      }
    } else {
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    errors,
  }
};

export default useForm;