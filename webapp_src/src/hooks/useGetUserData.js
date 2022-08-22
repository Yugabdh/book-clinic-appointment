import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectUser,
  setUser
} from '../redux/user';

import {
  db,
} from '../firebase';

import {
  doc,
  query,
  getDocs,
  setDoc,
  collection,
  where
} from "firebase/firestore";

const useGetUserData = () => {
  const dispatch = useDispatch();

  // callback to reduce dependency
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  // getting state from store
  const user = useSelector(selectUser);

  const getDataFromFirebase = useCallback(async () => {
    if ((!user.firstName || !user.lastName || !user.gender || !user.age) && !dataFetched) {
      console.log("getDataFromFirebase hook called")
      setLoading(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          console.log("docs fetched from hook: ")
          if(docs.docs.length>0) {
            if (docs.docs[0].data()) {
              dispatch(setUser({
                ...docs.docs[0].data()
              }));
            }
          } else {
            setDoc(doc(db, "users", user.uid), {
              ...user,
              firstName: "",
              lastName: "",
              fullName: "",
              age: '',
              gender: "",
            }, { merge: true })
              .then(() => dispatch(setUser({
                ...user,
                firstName: "",
                lastName: "",
                fullName: "",
                age: '',
                gender: "",
              })));
          }
        }).finally(() => {
          setLoading(false);
          setDataFetched(true);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getDataFromFirebase();
    }
  }, [user]);

  return {
    loading, user,
  }
}

export default useGetUserData;