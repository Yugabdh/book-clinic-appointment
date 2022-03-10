import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Thunk functions
// Get user Data
export const getUserData = createAsyncThunk('user/getUserData', async (obj, { dispatch, getState }) => {
  const {userSlice} = getState();
  const userSnapshot = await getDoc(doc(db, 'users', userSlice.uid));
  if(userSnapshot.exists()) {
    return {userData:{...userSnapshot.data()}} 
  } else {
    if (userSlice.uid) {
      await setDoc(doc(db, "users", userSlice.uid), {
        firstName: "",
        lastName: "",
        fullName: "",
        age: 18,
        gender: ""
      });
    }
  }
  return {userData:{ firstName: "", lastName: "", fullName: "", age: 18, gender: "" }};
});

// Update user data
export const updateUserData = createAsyncThunk('user/updateUserData', async ({firstName, lastName, age, gender}, { dispatch, getState }) => {
  const {userSlice} = getState();
  console.log(firstName);
  await setDoc(doc(db, "users", userSlice.uid), {
    firstName: firstName,
    lastName: lastName,
    fullName: firstName + " " + lastName,
    age: age,
    gender: gender
  });
  return {userData:{firstName, lastName, fullName: firstName + " " + lastName, age, gender}};
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: null,
    uid: null,
    userData: {
      firstName: '',
      lastName: '',
      fullName: '',
      age: 18,
      gender: ''
    },
  },

  reducers: {
    SET_STATUS: (state, payload) => {
      state.status = payload;
    },
    SET_UID: (state, { payload }) => {
      state.uid = payload;
    },
    UNSET_UID: (state, action) => {
      state.uid = null;
    },
    SET_USERDATA: (state, { payload }) => {
      state.userData = payload.userData;
    },
    UNSET_USERDATA: (state, action) => {
      state.userData = null;
    },
  },

  extraReducers: {
    [updateUserData.pending]: (state, action) => {
      state.status = 'pending';
    },
    [updateUserData.fulfilled]: (state, { payload }) => {
      state.status = 'sucess';
      state.userData = payload.userData;
      console.log(state.userData)
    },
    [updateUserData.rejected]: (state, action) => {
      state.userData = null;
      state.status = 'failed';
    },

    [getUserData.pending]: (state, action) => {
      state.status = 'pending';
    },
    [getUserData.fulfilled]: (state, { payload }) => {
      state.status = 'sucess';
      state.userData = payload.userData;
      console.log(state.userData)
    },
    [getUserData.rejected]: (state, action) => {
      state.userData = null;
      state.status = 'failed';
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  SET_STATUS,
  SET_UID,
  UNSET_UID,
  SET_USERDATA,
  UNSET_USERDATA,
} = userSlice.actions;

export default userSlice.reducer;