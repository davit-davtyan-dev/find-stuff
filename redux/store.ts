import {Action, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const isNotProduction = process.env.NODE_ENV !== 'production';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: isNotProduction,
});
