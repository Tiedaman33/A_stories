import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action) => action.payload,
    addStory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setStories, addStory } = storiesSlice.actions;

export default storiesSlice.reducer;
