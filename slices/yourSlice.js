// slices/yourSlice.js
import { createSlice } from '@reduxjs/toolkit';

const yourSlice = createSlice({
  name: 'yourSlice',
  initialState: {
    someValue: null, // Your initial state here 
  
  },
  reducers: {
    // Your reducer logic here
    setSomeValue: (state, action) => {
      state.someValue = action.payload;
    },
  },
});

export const { setSomeValue } = yourSlice.actions;
export default yourSlice.reducer;
