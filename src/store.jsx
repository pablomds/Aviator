import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basket';

 const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

export default store