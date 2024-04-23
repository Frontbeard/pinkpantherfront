// store.js

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/features/CounterSlice'; // Corrige la importación

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Utiliza el reducer del contador
  },
});
