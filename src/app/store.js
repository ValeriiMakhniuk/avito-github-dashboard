import { configureStore } from '@reduxjs/toolkit';
import { loadState } from '../utils/localStorage';

import rootReducer from './root-reducer';

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

export default store;
