// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import yourSliceReducer from './slices/yourSlice';

const rootReducer = combineReducers({
  yourSlice: yourSliceReducer,
  // Add more slices here
});

export default rootReducer;
