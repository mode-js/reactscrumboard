import * as types from '../constants/actionTypes.js';

//need to use Axios throughout entire project to clean up API calls

export function addBoard(name, userId) {
  return async function (dispatch, getState) {
    const state = getState();
    const boards = state.boards.slice();

    const newBoard = {
      userId,
      name,
    };
    const response = await fetch('http://localhost:3000/boards', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    });

    const data = await response.json();
    boards.push(data);

    return dispatch({
      type: types.ADD_BOARD,
      boards,
    });
  };
}

export function getBoards(userId) {
  return async function (dispatch, getState) {
    const state = getState();
    const boards = state.boards.slice();

    const response = await fetch(`http://localhost:3000/boards?user_id=${userId}`,{
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();

    data.forEach(board => boards.push(board));

    return dispatch({
      type: types.GET_BOARDS,
      boards,
    });
  };
}

export function deleteBoard(boardId) {
  return async function (dispatch, getState) {
    const boards = getState().boards.filter(board => board._id !== boardId);
    const response = await fetch(`http://localhost:3000/boards?_id=${boardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return dispatch({
      type: types.DELETE_BOARD,
      boards,
    });
  };
}
