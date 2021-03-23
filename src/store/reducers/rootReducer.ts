import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import userReducer from './userReducer';
import componentsVisibilityReducer from './componentsVisibility';
import popupsReducer from './popupsReducer';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
  componentsVisibility: componentsVisibilityReducer,
  popups: popupsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
