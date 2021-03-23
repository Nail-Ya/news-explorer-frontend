import { DateTimeFormatOptions } from './types';

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
