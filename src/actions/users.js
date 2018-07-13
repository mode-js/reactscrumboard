import axios from 'axios';
import * as types from '../constants/actionTypes.js';
import 'babel-polyfill';

export function logInUser() {
  return async function(dispatch, getState) {
    return dispatch({
      type: types.LOG_IN_USER,
      payload: true,
    });
  };
}

export function logoutUser() {
  return async function(dispatch, getState) {
    return dispatch({
      type: types.LOG_OUT_USER,
      payload: false,
    });
  };
}

// dont need this anymore, but wont delete now
// export function getUsers() {
//   return async function(dispatch, getState) {
//     axios.get('http://localhost:3000/getusers').then(res => {
//       const { users } = getState();
//       return dispatch({ type: types.GET_USERS, users: res.data });
//     });
//   };
// }

// dont need this anymore, but wont delete now
// export function isLoggedIn(id) {
//   return async function(dispatch, getState) {
//     const users = getState().users.map(x => {
//       if (x._id === id) x.isLoggedIn = true;
//       return x;
//     });
//     return dispatch({
//       type: types.IS_LOGGED_OUT,
//       users,
//     });
//   };
// }

