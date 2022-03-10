import React, { useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from '../firebase';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export  function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
    return unsubscribe;
  }, [])

  
  const value = {
    currentUser,
    signIn,
    logOut
  };

  return(
    <AuthContext.Provider value={ value }>
      {!loading && children }
    </AuthContext.Provider>
  );
}
