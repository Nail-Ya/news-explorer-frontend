import { DateTimeFormatOptions } from './types';
export const newsApiUrl: string = 'https://nomoreparties.co/news/v2/everything/';
export const newsApiKey: string = 'b878c6abab124958a820ce6f67bbb04e';
// export const BASE_URL: string = 'https://api.gnews.students.nomoreparties.co';
export const BASE_URL: string = 'http://localhost:3000';

export const getPresentDay = (): string => {
  const presentDay: string = new Date().toISOString();
  return presentDay;
};

export const getSevenDaysAgoDay = (): string => {
  const presentDay: Date = new Date();
  presentDay.setDate(presentDay.getDate() - 7);
  const sevenDaysAgoDay: string = presentDay.toISOString();
  return sevenDaysAgoDay;
};
// приведение даты к читаемому формату
export const setCorrectDate = (cardDate: string) => {
  const dateOptions: DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };
  const articleDate: Date = new Date(cardDate);
  const dayAndMonth: string = articleDate.toLocaleString('ru', dateOptions);
  const correctArticleDate: string = `${dayAndMonth}, ${articleDate.getFullYear()}`;
  return correctArticleDate;
};
