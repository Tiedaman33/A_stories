// src/redux/storyReducer.js
const initialState = {
    storiesList: [], // Empty array as a placeholder for stories
  };
  
  function storyReducer(state = initialState, action) {
    switch (action.type) {
      // You can handle actions like 'SET_STORIES' later if needed
      case 'SET_STORIES':
        return { ...state, storiesList: action.payload };
      default:
        return state;
    }
  }
  
  export default storyReducer;
  