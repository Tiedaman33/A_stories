// Action Types
export const SET_STORIES = 'SET_STORIES';

// Action Creators
export const setStories = (stories) => ({
  type: SET_STORIES,
  payload: stories,
});
