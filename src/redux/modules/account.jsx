const CREATE = 'account/CREATE';
const LOAD = 'account/LOAD';

export const createAccount = (account) => {
  return {type: CREATE, account};
}
export const loadAccount = (id) => {
  return {type: LOAD, id};
}

const initialState = {
  account: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'account/CREATE': {
      console.log(action);
      return state;
    }
    default:
      return state;
  }
}