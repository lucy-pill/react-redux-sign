import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const SIGNUP = 'account/SIGNUP';
const SIGNIN = 'account/SIGNIN';
const SIGNOUT = 'account/SIGNOUT';

export const signUpAction = (account) => {
  return { type: SIGNUP, account };
};
export const signInAction = (signInInfo) => {
  return { type: SIGNIN, signInInfo };
};
export const signOutAction = (signOutResult) => {
  return { type: SIGNOUT, signOutResult };
};

const initialState = {
  userName: null,
  loginStatus: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'account/SIGNUP': {
      try {
        addDoc(collection(db, 'account'), action.account);
      } catch (error) {
        console.error(`Error adding document: ${error}`);
      }
      return state;
    }
    case 'account/SIGNIN': {
      console.log(action.signInInfo);
      return {
        userName: action.signInInfo.userName,
        loginStatus: action.signInInfo.loginStatus,
      };
    }
    case 'account/SIGNOUT': {
      return { userName: null, loginStatus: action.signOutResult };
    }
    default:
      return state;
  }
}
