export const newsApiUrl = 'https://nomoreparties.co/news/v2/everything/';
export const newsApiKey = 'b878c6abab124958a820ce6f67bbb04e';
export const BASE_URL = 'https://api.gnews.students.nomoreparties.co';

export const getPresentDay = () => {
  const presentDay = new Date().toISOString();
  return presentDay;
}

export const getSevenDaysAgoDay = () => {
  const presentDay = new Date();
  presentDay.setDate(presentDay.getDate() - 7);
  const sevenDaysAgoDay = presentDay.toISOString();
  return sevenDaysAgoDay;
}

