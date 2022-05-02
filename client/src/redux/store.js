import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import { changeReducer } from './auth/controlSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    change: changeReducer
  },
});

export default store;
