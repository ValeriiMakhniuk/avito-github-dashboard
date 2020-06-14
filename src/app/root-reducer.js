import { combineReducers } from '@reduxjs/toolkit';

import reposDisplayReducer from '../features/repos-display/repos-display-slice';

const rootReducer = combineReducers({
  reposDisplay: reposDisplayReducer,
});

export default rootReducer;
