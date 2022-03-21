import React, { useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from '../firebase';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export  function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [receptionist, setReceptionist] = useState(false);
  const [doctor, setDoctor] = useState(false);

  function signIn(OTP) {
    let confirmationResult = window.confirmationResult;
    return confirmationResult.confirm(OTP);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
        console.log(user);
        user.getIdTokenResult().then((idTokenResult) => {
          // Confirm the user is an Receptionist.
          if (!!idTokenResult.claims.receptionist) {
            setReceptionist(true);
          } else {
            setReceptionist(false);
          }
          // Confirm the user is an doctor.
          if (!!idTokenResult.claims.doctor) {
            setDoctor(true);
          } else {
            setDoctor(false);
          }
        }).catch((error) => {
          console.log(error);
        });
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [])

  
  const value = {
    currentUser,
    receptionist,
    doctor,
    signIn,
    logOut
  };

  return(
    <AuthContext.Provider value={ value }>
      {!loading && children }
    </AuthContext.Provider>
  );
}
