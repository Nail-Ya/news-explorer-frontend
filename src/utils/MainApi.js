import {BASE_URL} from './constants.js'

// отправка запроса на регистрацию
export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
  .then((response) => {
    if (!response.ok){
      return response.json()
        .then((err) => {
          throw new Error(err.message);
        })
    }
    return response.json();
  })
}

// отправка запроса на логин
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => {
    if (!response.ok){
      return response.json()
        .then((err) => {
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
export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => data)
}

// отправка запроса на получение сохраненных статей
export const getSavedArticles = () => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
  .then((res) => {
    return res.json();
  });
}

// запрос на сохранение статьи в базу данных
export const saveArticle = (article) => {
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
  .then((res) => {
    return res.json();
  });
}

// запрос на удаление статьи из базы данных
export const deleteArticle = (article) => {
  return fetch(`${BASE_URL}/articles/${article._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then((res) => {
    return res.json();
  });
};

