export interface DateTimeFormatOptions {
  month: 'long';
  day: 'numeric';
};

export interface Source {
  id: number;
  name: string;
};

export interface Article {
  owner?: string;
  author: string;
  content: string;
  keyword: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  link: string;
  urlToImage: string;
  description: string;
};

export interface SavedArticle {
  date: string;
  image:  string;
  keyword:  string;
  link: string;
  source: string;
  text:  string;
  title: string;
  __v: number;
  _id: string;
  owner?: string;
};

export interface User {
  email?: string;
  name?: string;
  __v?: number;
  _id?: string;
};

export interface InputValues {
  emailLogin?: string;
  passwordLogin?: string;
  email?: string;
  name?: string;
  password?: string;
};

export interface ErrorValues {
  emailLogin?: string;
  passwordLogin?: string;
  email?: string;
  name?: string;
  password?: string;
};

export interface ErrorResponse {
  message: string;
};

export interface ServerResponseAtLogin {
  token: string;
};

export interface ServerResponseAtRequestingUserInfo {
  data: User;
};

export interface NewsServerResponseAtLogin {
  articles?: Array<Article>;
  status: string;
  totalResults?: number;
};

// redux
export type ArticleState = {
  articles: Array<Article>;
  articlesToDisplay: Array<Article>;
  mySavedArticles: Array<SavedArticle>;
};

export type ArticleAction = {
  type: string;
  articles?: Array<Article>;
  articlesToDisplay?: Array<Article>;
  mySavedArticles?: Array<SavedArticle>;
};

export type UserState = {
  currentUser: User;
  isLoggedIn: boolean;
};

export type UserAction = {
  type: string;
  currentUser?: User;
  isLoggedIn?: boolean;
};

export type componentsVisibilityState = {
  isPreloaderShow: boolean;
  isNotFoundShow: boolean;
  isErrorNewsServer: boolean;
  isNewsCardListShow: boolean;
};

export type componentsVisibilityAction = {
  type: string;
  isPreloaderShow?: boolean;
  isNotFoundShow?: boolean;
  isErrorNewsServer?: boolean;
  isNewsCardListShow?: boolean;
};

export type popupsState = {
  isLoginPopupOpen: boolean;
  isRegisterPopupOpen: boolean;
  isMobileHeaderPopupOpen: boolean;
  isSuccessPopupOpen: boolean;
};

export type popupsAction = {
  type: string;
  isLoginPopupOpen?: boolean;
  isRegisterPopupOpen?: boolean;
  isMobileHeaderPopupOpen?: boolean;
  isSuccessPopupOpen?: boolean;
};
