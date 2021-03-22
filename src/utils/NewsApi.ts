import { newsApiUrl, newsApiKey } from './constants';
import { getPresentDay, getSevenDaysAgoDay } from './helpers';

export const getNews = (request: string): Promise<any> => {
  const url: string = `${newsApiUrl}?` +
  `q=${request}&` +
  `from=${getSevenDaysAgoDay()}&` +
  `to=${getPresentDay()}&` +
  'sortBy=popularity&' +
  'pageSize=100&' +
  `apiKey=${newsApiKey}`;

  return fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  .then((res: Response) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
};
