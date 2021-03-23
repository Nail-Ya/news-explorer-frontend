import React from 'react';
import Button from '../UI/Button/Button';
import './SearchForm.scss';
import { useDispatch } from 'react-redux';
import {
  setArticlesActionCreator,
  setArticlesToDisplayActionCreator
} from '../../store/actions/articlesActionCreators';
import {
  setIsPreloaderShowActionCreator,
  setIsNotFoundShowActionCreator,
  setIsErrorNewsServerActionCreator,
  setIsNewsCardListShowActionCreator
} from '../../store/actions/componentsVisibilityActionCreators';
import * as newsApi from '../../utils/NewsApi';
import {
  Article,
  NewsServerResponseAtLogin
} from '../../utils/types';

const SearchForm: React.FC = () => {

  const dispatch = useDispatch();
  const [keyword, setKeyword] = React.useState<string>(''); // значение запроса

  const handleRequestValueChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(evt.target.value);
  };

  const handleSearchArticles = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(setIsNewsCardListShowActionCreator(false));
    dispatch(setIsPreloaderShowActionCreator(true));
    dispatch(setIsNotFoundShowActionCreator(false));
    dispatch(setArticlesActionCreator([]));
    dispatch(setArticlesToDisplayActionCreator([]));

    newsApi.getNews(keyword)
      .then((res: NewsServerResponseAtLogin) => {
        dispatch(setIsPreloaderShowActionCreator(false));
        dispatch(setIsNewsCardListShowActionCreator(true));
        // добавляем каждой статье keyword ключевое слово
        const newArray: Array<Article> = res.articles!.map((item: Article) => {
          item.keyword = keyword
          return item;
        });
        dispatch(setArticlesActionCreator(newArray));
        dispatch(setArticlesToDisplayActionCreator(newArray.slice(0, 3)));

        // добавляем в локальное хранилище массив статей и значение запроса
        localStorage.setItem('articles', JSON.stringify(newArray));
        localStorage.setItem('articlesToDisplay', JSON.stringify(newArray.slice(0, 3)));
        localStorage.setItem('keyword', keyword);

        //если новостей не найдено, то показать компонент NotFound
        if (newArray.length === 0) {
          dispatch(setIsNotFoundShowActionCreator(true));
          dispatch(setIsNewsCardListShowActionCreator(false));
          localStorage.setItem('isNewsCardListShow', JSON.stringify(false));
        } else {
          dispatch(setIsNotFoundShowActionCreator(false));
          dispatch(setIsNewsCardListShowActionCreator(true));
          localStorage.setItem('isNewsCardListShow', JSON.stringify(true));
        }
      })
      .catch((err) => {
        console.log(`Ошибка при поиске новостей: ${err}`);
        dispatch(setIsNotFoundShowActionCreator(true));
        dispatch(setIsPreloaderShowActionCreator(false));
        dispatch(setIsErrorNewsServerActionCreator(true));
      });
  };

  return (
    <form
      className="search__form"
      onSubmit={handleSearchArticles}
    >
      <input
        type="text"
        className="search__input"
        placeholder="Введите тему новости"
        onChange={handleRequestValueChange}
        required
      />
      <Button
        className="search__button"
        type="submit"
      >
        Искать
      </Button>
    </form>
  );
};

export default SearchForm;
