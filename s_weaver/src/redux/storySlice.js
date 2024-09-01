// redux/storiesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: [],
  reducers: {
    setStories: (state, action) => action.payload,
    deleteStory: (state, action) => state.filter((story) => story._id !== action.payload),
  },
});

export const { setStories, deleteStory } = storiesSlice.actions;
export default storiesSlice.reducer;
