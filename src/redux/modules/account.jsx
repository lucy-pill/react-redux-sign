import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';

const signSlice = createSlice({
  name: 'sign',
  initialState: {
    userName: null,
    loginStatus: false,
  },
  reducers: {
    signUpAction: (state, action) => {
      try {
        addDoc(collection(db, 'account'), action.payload);
      } catch (error) {
        console.error(`Error adding document: ${error}`);
      }
    },
    signInAction: (state, action) => {
      state.userName = action.payload.userName;
      state.loginStatus = action.payload.loginStatus;
    },
    signOutAction: (state, action) => {
      state.userName = null;
      state.loginStatus = action.payload;
    },
  },
});
 
export const {signUpAction, signInAction, signOutAction} = signSlice.actions;
export default signSlice.reducer;