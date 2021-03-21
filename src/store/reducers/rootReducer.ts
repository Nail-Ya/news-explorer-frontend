import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import userReducer from './userReducer';
import componentsVisibilityReducer from './componentsVisibility';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
  componentsVisibility: componentsVisibilityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
