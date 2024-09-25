// src/redux/storiesSlice.js
import { createSlice } from '@reduxjs/toolkit'; // Make sure to import createSlice

const initialState = {
  storiesList: [], // Initialize as an empty array
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories(state, action) {
      state.storiesList = action.payload; // Set the storiesList to the payload
    },
    // You can add more reducers here if needed
  },
});

// Export the action for setting stories
export const { setStories } = storiesSlice.actions;

// Export the reducer to be used in the store
export default storiesSlice.reducer;
