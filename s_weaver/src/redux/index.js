import { combineReducers } from 'redux';
import userReducer from './userReducer';
import storyReducer from './storyReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stories: storyReducer,
});

export default rootReducer;
