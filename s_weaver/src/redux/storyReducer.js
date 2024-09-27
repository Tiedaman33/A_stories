// src/redux/storyReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storiesList: [],
};

const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories(state, action) {
      state.storiesList = action.payload; // Update the stories list
    },
  },
});

// Export the action
export const { setStories } = storySlice.actions;

// Export the reducer
export default storySlice.reducer;
