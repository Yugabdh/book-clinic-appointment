import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import { useNavigate } from "react-router-dom";

import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, currentUser } = useAuth();

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  // Errors values for input
  const [errors, setErrors] = useState({});

  // Form inputs
  const [values, setValues] = useState({
    formTelNumber: '',
    formPassword: '',
  });

  // States handeling OTP
  const [recaptchaRequest, setRecaptchaRequest] = useState(false);
  const [allowSignIn, setAllowSignIn] = useState(false);

  // Shows Re-captcha on phone number selection
  const generateRecaptcha = () => {
    console.log('generateRecaptcha called')
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        'size': 'invisible',
        'callback': (response) => {
          setAllowSignIn(true);
        }
      },
      auth
    );
    const mobileNumber = "+91"+values.formTelNumber;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, mobileNumber, appVerifier)
    .then((confirmationResult) => {
      setModalData({
        title: "OTP send",
        message: "Please check your inbox for OTP.",
        classname: "sucess"
      })
      window.confirmationResult = confirmationResult;
      setAllowSignIn(true);
      setModalShow(true);
    }).catch((error) => {
      console.error(error);
      setModalData({
        title: "Failed to send OTP",
        message: "Error occured while trying to send OTP please try again after sometime.",
        classname: "error"
      });
      setModalShow(true);
    });
  }

  async function signInUser() {

    console.log("Inside signInUser");
    try {
      setModalData({});
      await signIn(values.formPassword);
      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
    } catch(error) {
      console.error('[Code]', error.code);
      console.error('[Message]', error.message);
      let errorMsg = "";
      switch (error.code) {
        case 'auth/invalid-verification-code':
          errorMsg = "Invalid OTP! Please try again.";
          break;
        default:
          errorMsg = "Error occured while verifiying OTP please try later.";
          console.log(error.message);
      }
      setModalData({
        title: "Error",
        message: errorMsg,
        classname: "error"
      });
      setModalShow(true);
      // window.recaptchaVerifier.render().then(function(widgetId) {
      //   if (window.grecaptcha) {
      //     window.grecaptcha.reset(widgetId);
      //   }
      // })
    }
  }

  function validate(values, recaptchaRequest) {
    console.log("inside validate")
    let errors = {};
    if (recaptchaRequest === true) {
      if (!values.formPassword) {
        errors.formPassword = "OTP required.";
      } else if (values.formPassword.length !== 6) {
        errors.formPassword = "OTP must be 6 characters.";
      } else {
        setErrors({});
        console.log("Calling signInUser");

        signInUser();
      }
    } else {
      if (!values.formTelNumber) {
        errors.formTelNumber = "Please enter contact number.";
      } else if (!/^[0-9]{10}$/.test(values.formTelNumber)) {
        console.log(values.formTelNumber);
        errors.formTelNumber = "Mobile Number must have 10 digits.";
      } else {
        setErrors({});
        console.log("Calling generateRecaptcha");
        generateRecaptcha();
        setRecaptchaRequest(true);
      }
    }
    return errors;
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values, recaptchaRequest));
    console.log(values);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return (
    <>
    <Form onSubmit={ handleSubmit } noValidate>
      {currentUser && currentUser.uid}
      <Form.Group className="mb-3">
        <InputGroup>
          <InputGroup.Text className="country-span">+91</InputGroup.Text>
          <Form.Control
            autoComplete="off"
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Enter contact number"
            name="formTelNumber"
            value={values.formTelNumber || ''}
            className={`${errors.formTelNumber && 'wrong-input'}`}
            onChange={handleChange}
            required
            disabled={recaptchaRequest}
            aria-describedby="formTelNumber"
          />
        </InputGroup>
        {
        errors.formTelNumber && (<Form.Text className="text-danger">{errors.formTelNumber}</Form.Text>)
        }
      </Form.Group>
      <Form.Group controlId="recaptcha-container">
        <div id="recaptcha-container"></div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          type="password"
          placeholder="Enter OTP"
          name="formPassword"
          value={values.formPassword || ''}
          className={`${errors.formPassword && 'wrong-input'}`}
          onChange={handleChange}
          required={allowSignIn}
          disabled={!allowSignIn}
        />
        {
        errors.formPassword && (<Form.Text className="text-danger">{errors.formPassword}</Form.Text>)
        }
      </Form.Group>

      <hr />

      <button type="submit" className="primary-button button-lg" >{recaptchaRequest? "Verify OTP": "Request OTP"}</button>

      {/* This modal will show up on error or otp send */}
      <VerticalCenteredModalComponent
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/* <div className="d-flex justify-content-center pt-3 bottom-link">
        <Link to="/register">Create an account !</Link>
      </div> */}
    </Form>
    
    
    </>
  );
};

export default LoginForm;