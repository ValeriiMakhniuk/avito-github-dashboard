import { combineReducers } from '@reduxjs/toolkit';

import reposDisplayReducer from '../features/repos-display/repos-display-slice';
import reposReducer from '../features/repo-list/repo-list-slice';

const rootReducer = combineReducers({
  reposDisplay: reposDisplayReducer,
  repos: reposReducer,
});

export default rootReducer;
