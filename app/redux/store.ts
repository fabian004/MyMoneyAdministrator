import { configureStore } from '@reduxjs/toolkit';
import totalsReducer from './totalsSlice';

const store = configureStore({
  reducer: {
    totals: totalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
