import {BASE_URL} from './constants';
import { ErrorResponse, Article, SavedArticle } from './types';

// отправка запроса на регистрацию
export const register = (email: string, password: string, name: string): Promise<any> => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
  .then((response: Response) => {
    if (!response.ok){
      return response.json()
        .then((err: ErrorResponse) => {
          throw new Error(err.message);
        })
    }
    return response.json();
  })
}

// отправка запроса на логин
export const authorize = (email: string, password: string): Promise<any> => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
  .then((response: Response) => {
    if (!response.ok){
      return response.json()
        .then((err: ErrorResponse) => {
          throw new Error(err.message);
        })
    }
    return response.json();
  })
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};

// отправка запроса для получения данных пользователя
export const getUserInfo = (token: string): Promise<any> => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res: Response) => res.json())
  .then(data => data);
};

// отправка запроса на получение сохраненных статей
export const getSavedArticles = (): Promise<any> => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
  .then((res: Response) => {
    return res.json();
  });
}

// запрос на сохранение статьи в базу данных
export const saveArticle = (article: Article): Promise<any> => {
  const { keyword, title, description, publishedAt, source, url, urlToImage } = article;
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      keyword,
      title,
      text: description,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage || 'https://хлебов.рф/files/no_photo3.jpg'
    }),
  })
  .then((res: Response) => {
    return res.json();
  });
}

// запрос на удаление статьи из базы данных
export const deleteArticle = (article: SavedArticle): Promise<any> => {
  return fetch(`${BASE_URL}/articles/${article._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then((res: Response) => {
    return res.json();
  });
};
