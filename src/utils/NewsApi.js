import { newsApiUrl, newsApiKey, getPresentDay, getSevenDaysAgoDay } from './constants';

export default class NewsApi {
  constructor() {
    this._baseUrl = newsApiUrl;
    this._apiKey = newsApiKey;
    this._presentDay = getPresentDay();
    this._sevenDaysAgoDay = getSevenDaysAgoDay();
  };

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  _setRequestUrl(request) {
    this._url = `${this._baseUrl}?` +
      `q=${request}&` +
      `from=${this._sevenDaysAgoDay}&` +
      `to=${this._presentDay}&` +
      'sortBy=popularity&' +
      'pageSize=100&' +
      `apiKey=${this._apiKey}`;

    return this._url;
  }

  getNews(request) {
    this._setRequestUrl(request);

    return fetch(this._url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._handleResponse)
  }
}

