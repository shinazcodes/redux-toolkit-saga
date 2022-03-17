import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from '../features/saga/saga';
import sagaCounterReducer from '../features/counter/sagaCounterSlice';

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sagaCounter: sagaCounterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga)