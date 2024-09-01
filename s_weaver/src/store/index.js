// src/store/index.js
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(
  combineReducers(rootReducer), // Pass rootReducer directly to combineReducers
  // Optional: Add Redux DevTools Extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
