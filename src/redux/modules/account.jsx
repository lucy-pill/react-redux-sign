import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const SIGNUP = 'account/SIGNUP';
const SIGNIN = 'account/SIGNIN';
const SIGNOUT = 'account/SIGNOUT';

export const signUpAction = (account) => {
  return { type: SIGNUP, account };
};
export const signInAction = (signInResult) => {
  return { type: SIGNIN, signInResult };
};
export const signOutAction = (signOutResult) => {
  return { type: SIGNOUT, signOutResult };
};

const initialState = {
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
      return { loginStatus: action.signInResult };
    }
    case 'account/SIGNOUT': {
      console.log(action.signOutResult);
      return { loginStatus: action.signOutResult };
    }
    default:
      return state;
  }
}
