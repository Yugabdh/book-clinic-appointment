import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser, setUser, setClaims } from '../../redux/user';

import FullScreenLoaderComponent from '../FullScreenLoaderComponent';

import { auth, onAuthStateChanged } from '../../firebase';

const UserAuthCheckComponent = ({children}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser && !user) {
        setLoading(true);
        // setting up claims
        let doctor=false, receptionist=false;
        loggedInUser.getIdTokenResult().then((idTokenResult) => {
          console.log(idTokenResult);
          // Confirm the user is an Receptionist.
          if (!!idTokenResult.claims.receptionist) {
            receptionist = true;
          }
          // Confirm the user is an doctor.
          if (!!idTokenResult.claims.doctor) {
            doctor = true;
          }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          dispatch(setClaims({doctor: doctor, receptionist: receptionist}));
          dispatch(setUser({uid: loggedInUser.uid, phoneNumber: loggedInUser.phoneNumber}));
          console.log("called from route");
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    })
  }, []);

  return (
    <>
    {
      loading? 
      
      <div style={{height: "100vh"}} className="d-flex justify-content-center align-items-center">
        <FullScreenLoaderComponent />
      </div>: 
      <>
        {children}
      </>
    }
    </>
  )
}

export default UserAuthCheckComponent;