import * as types from '../constants/actionTypes';

const initialState = {
  isUserLoggedIn: false
};

export default (state = initialState, action) => {
  let users;
  switch (action.type) {
    // dont need this anymore, but wont delete now
    // case types.GET_USERS:
    //   users = action.users;
    //   return state;
    // dont need this anymore, but wont delete now
    // case types.IS_LOGGED_OUT:
    //   return !state.isUserLoggedIn;
    case types.LOG_OUT_USER:
      return Object.assign({}, state, {isUserLoggedIn: action.payload});    
    case types.LOG_IN_USER:
      return Object.assign({}, state, {isUserLoggedIn: action.payload});
    default:
      return state;
  }
};
