import * as types from '../constants/actionTypes';

const initialState = {
  isUserLoggedIn: false
};

export default (state = initialState, action) => {
  let users;
  switch (action.type) {
    case types.GET_USERS:
      users = action.users;
      return state;
    case types.IS_LOGGED_OUT:
      return !state.isUserLoggedIn;
    case types.LOG_IN_USER:
      return Object.assign({}, state, {isUserLoggedIn: action.payload});
    default:
      return state;
  }
};
