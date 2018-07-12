import * as types from '../constants/actionTypes.js';

export function addTask(name, boardId) {
  return async function (dispatch, getState) {
    const state = getState();
    const tasks = state.tasks.slice();

    const newTask = {
      boardId,
      status: 'todo',
      name,
    };

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    const data = await response.json();
    tasks.push(data);

    return dispatch({
      type: types.ADD_TASK,
      tasks,
    });
  };
}

export function clearTasks(tasks) {
  const newTasks = tasks.slice();
  newTasks.splice(0);

  return {
    type: types.CLEAR_TASKS,
    tasks: newTasks,
  };
}

export function getTasks(boardId) {
  return async function (dispatch, getState) {
    const state = getState();
    const tasks = state.tasks.slice();

    const response = await fetch(`http://localhost:3000/tasks/?board_id=${boardId}`,{
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    data.forEach(task => tasks.push(task));

    return dispatch({
      type: types.GET_TASKS,
      tasks,
    });
  };
}

/// new stuff
export function updateTask(task, updates) {
  return async function (dispatch, getState) {
    const updatedTask = {
      ...task,
      ...updates,
    };

    console.log('updatedTask', updatedTask);

    const response = await fetch(`http://localhost:3000/updatetasks`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    console.log('returnedtask', data);

    const tasks = getState().tasks.map(x => {
      if (x._id !== task._id) return x;
      return updatedTask;
    });
    return dispatch({
      type: types.UPDATE_TASK,
      tasks,
    });
  };
}

export function deleteTask(taskId) {
  return async function (dispatch, getState) {
    const tasks = getState().tasks.filter(task => task._id !== taskId);


    const response = await fetch(`http://localhost:3000/tasks?_id=${taskId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    return dispatch({
      type: types.DELETE_TASK,
      tasks,
    });
  };
}
