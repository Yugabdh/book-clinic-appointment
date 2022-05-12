import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import { useNavigate } from "react-router-dom";

import { setUser, setClaims } from '../../redux/user';
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin';

import validate from './LoginFormValidationRules';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  // to handel otp and recaptcha
  const [recaptchaRequest, setRecaptchaRequest] = useState(false);
  const [allowSignIn, setAllowSignIn] = useState(false);

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    setIsSubmitting,
  } = useForm(login, validate);

  // Called if OTP is sent successfully
  const otpSend = () => {
    setModalData({
      title: "OTP send",
      message: "Please check your inbox for OTP.",
      classname: "sucess"
    });
    setAllowSignIn(true);
    setModalShow(true);
  }

  // Called if failed to send OTP
  const otpSendFailed = () => {
    setModalData({
      title: "Failed to send OTP",
      message: "Error occured while trying to send OTP please try again after sometime.",
      classname: "error"
    });
    setModalShow(true);
  }

  const {
    loading,
    generateRecaptcha,
    signInWithMobileNumber,
  } = useLogin(values);

  function login() {
    console.log('login'+loading);
    if(!loading && values.phoneNumber && !allowSignIn) {
      generateRecaptcha(setRecaptchaRequest);
      signInWithMobileNumber(otpSend, otpSendFailed);
    }

    if (allowSignIn) {
      if (!values.otp) {
        setErrors({otp: "OTP required."});
      } else if (values.otp.length !== 6) {
        setErrors({otp: "OTP must be 6 characters."});
      } else {
        setErrors({});
        console.log("Calling signInUser");
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(values.otp).then((result) => {
          const user = result.user;
          console.log(user);
          console.log(user.uid);
          if (user) {
            // setting up claims
            let customClaims = {doctor: false, receptionist: false,};
            user.getIdTokenResult().then((idTokenResult) => {
              console.log(idTokenResult);
              // Confirm the user is an Receptionist.
              if (!!idTokenResult.claims.receptionist) {
                customClaims.receptionist = true;
              }
              // Confirm the user is an doctor.
              if (!!idTokenResult.claims.doctor) {
                customClaims.doctor = true;
              }
            }).catch((error) => {
              console.log(error);
            });
            dispatch(setUser({uid: user.uid, phoneNumber: user.phoneNumber}));
            dispatch(setClaims(customClaims));

            navigate("/dashboard", { replace: true });
          }
        }).catch((error) => {
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
            title: "Failed",
            message: errorMsg,
            classname: "error"
          });
          setModalShow(true);
        });
      }
    }
    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-3">
        <InputGroup>
          <InputGroup.Text className="country-span">+91</InputGroup.Text>
          <Form.Control
            autoComplete="off"
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Enter contact number"
            name="phoneNumber"
            value={values.phoneNumber || ''}
            className={`${errors.phoneNumber && 'wrong-input'}`}
            onChange={handleChange}
            required
            disabled={recaptchaRequest}
            aria-describedby="phoneNumber"
          />
        </InputGroup>
        {
        errors.phoneNumber && (<Form.Text className="text-danger">{errors.phoneNumber}</Form.Text>)
        }
      </Form.Group>
      <Form.Group controlId="recaptcha-container">
        <div id="recaptcha-container"></div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Enter OTP"
          name="otp"
          value={values.otp || ''}
          className={`${errors.otp && 'wrong-input'}`}
          onChange={handleChange}
          required={allowSignIn}
          disabled={!allowSignIn}
        />
        {
        errors.otp && (<Form.Text className="text-danger">{errors.otp}</Form.Text>)
        }
      </Form.Group>

      <hr />

      <button type="submit" className="primary-button button-lg" disabled={loading}>{recaptchaRequest? "Verify OTP": "Request OTP"}</button>

      {/* This modal will show up on error or otp send */}
      <VerticalCenteredModalComponent
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Form>
  );
};

export default LoginForm;