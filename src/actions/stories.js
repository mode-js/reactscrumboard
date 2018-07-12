import * as types from '../constants/actionTypes';

export function addStory(name, boardId) {
  return async function (dispatch, getState) {
    const state = getState();
    const stories = state.stories.slice();

    const newStory = {
      boardId,
      name,
      done: false,
    };

    const response = await fetch('http://localhost:3000/stories', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStory),
    });

    const data = await response.json();
    stories.push(data);

    return dispatch({
      type: types.ADD_STORY,
      stories,
    });
  };
}

export function clearStories(stories) {
  const newStories = stories.slice();
  newStories.splice(0);

  return {
    type: types.CLEAR_STORIES,
    stories: newStories,
  };
}

export function getStories(boardId) {
  return async function (dispatch, getState) {
    const state = getState();
    const stories = state.stories.slice();

    const response = await fetch(`http://localhost:3000/stories?board_id=${boardId}`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    data.forEach(story => stories.push(story));

    return dispatch({
      type: types.GET_STORIES,
      stories,
    });
  };
}

export function updateStory(story, updates) {
  return async function (dispatch, getState) {
    const updatedStory = {
      ...story,
      ...updates,
    };

    const response = await fetch(`http://localhost:3000/updatestories`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStory),
    });

    const stories = getState().stories.map(x => {
      if (x._id !== story._id) return x;
      return updatedStory;
    });

    return dispatch({
      type: types.UPDATE_STORY,
      stories,
    });
  };
}

export function deleteStory(storyId) {
  return async function (dispatch, getState) {
    const stories = getState().stories.filter(story => story._id !== storyId);
    const response = await fetch(`http://localhost:3000/stories?_id=${storyId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return dispatch({
      type: types.DELETE_STORY,
      stories,
    });
  };
}
