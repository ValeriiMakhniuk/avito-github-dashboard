import { combineReducers } from '@reduxjs/toolkit';

import reposDisplayReducer from '../features/repos-display/repos-display-slice';
import reposReducer from '../features/repo-list/repo-list-slice';
import contributorsReducer from '../features/repo-details/contributors-slice';
import languagesReducer from '../features/repo-details/languages-slice';

const rootReducer = combineReducers({
  reposDisplay: reposDisplayReducer,
  repos: reposReducer,
  contributors: contributorsReducer,
  languages: languagesReducer,
});

export default rootReducer;
