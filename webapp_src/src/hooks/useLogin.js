import { useState } from 'react';

import { 
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from '../firebase';

const useLogin = (values) => {

  // form states
  const [loading, setLoading] = useState(false);

  const generateRecaptcha = (onSuccess) => {
    setLoading(true);
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        'size': 'invisible',
        'callback': (response) => {
          onSuccess(true);
        }
      },
      auth
    );
    setLoading(false);
  }


  const signInWithMobileNumber = (onSuccess, onError) => {
    setLoading(true);
    const mobileNumber = "+91"+values.phoneNumber;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, mobileNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      onSuccess();
    }).catch((error) => {
      onError();
    }).finally(() => {
      setLoading(false);
    });
  }

  return {
    loading,
    generateRecaptcha,
    signInWithMobileNumber,
  }
}

export default useLogin;