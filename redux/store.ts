import {
  Action,
  configureStore,
  isFulfilled,
  isPending,
  isRejected,
  isRejectedWithValue,
  Middleware,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import Logger from '../utils/logger';

const isNotProduction = process.env.NODE_ENV !== 'production';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

type AppMiddleware<DispatchExt = {}> = Middleware<
  DispatchExt,
  RootState,
  AppDispatch
>;

const logger = new Logger('redux-action');

const checkFulfilled = isFulfilled();
const checkPending = isPending();
const checkRejected = isRejected();
const checkRejectedWithValue = isRejectedWithValue();

const actionLoggerMiddleware: AppMiddleware = () => next => action => {
  const isActionFulfilled = checkFulfilled(action);
  const isActionPending = checkPending(action);
  const isActionRejected = checkRejected(action);
  const isActionRejectedWithValue = checkRejectedWithValue(action);

  // TODO: handle isActionRejectedWithValue case
  if (isActionRejected || isActionRejectedWithValue) {
    logger.error(action.type, JSON.stringify(action.meta));
    logger.error(action.error);
  }
  if (isActionFulfilled) {
    logger.log(
      action.type,
      Array.isArray(action.payload)
        ? action.payload.length
        : typeof action.payload === 'object' &&
          action.payload &&
          'id' in action.payload
        ? action.payload.id
        : '',
    );
  }
  if (isActionPending) {
    logger.log(action.type);
  }
  next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: isNotProduction,
  middleware: getDefaultMiddleware => {
    const defaultMiddleWare = getDefaultMiddleware().concat([
      actionLoggerMiddleware,
    ]);

    return defaultMiddleWare;
  },
});
