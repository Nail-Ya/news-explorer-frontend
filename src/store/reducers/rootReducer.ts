import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
