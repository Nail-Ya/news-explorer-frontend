import React from 'react';
import './NewsCard.scss';
import { useLocation } from 'react-router-dom';
import { Article, SavedArticle } from '../../utils/types';
import { setCorrectDate } from '../../utils/constants';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import Icon from '../UI/Icon/Icon';
import * as mainApi from '../../utils/MainApi';
import { setMySavedArticlesActionCreator } from '../../store/actions/articlesActionCreators';
import { setIsLoginPopupOpenActionCreator } from '../../store/actions/popupsActionCreators';

export type Props = {
  cardsImageLink: string;
  cardSticker?: string;
  cardDate: string;
  cardTitle: string;
  cardSubtitle: string;
  cardSource: string;
  article: Article;
  getSavedArticles: () => Promise<any>;
};

const NewsCard: React.FC<Props> = ({
  cardsImageLink,
  cardSticker,
  cardDate,
  cardTitle,
  cardSubtitle,
  cardSource,
  article,
  getSavedArticles
}) => {

  const path: string = useLocation().pathname;
  const mySavedArticles: Array<SavedArticle> = useSelector((state: RootState) => state.articles.mySavedArticles);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  // определение сохраненной статьи
  const isSavedArticle: boolean = mySavedArticles.some((item: Article | SavedArticle) => {
    return item.link === article.url;
  });

  const iconClassName: string = classnames({
    'card__button-icon_type_save-marked': path === '/main' && isSavedArticle,
    'card__button-icon_type_save': path === '/main' && !isSavedArticle,
    'card__button-icon_type_delete': path === '/saved-news'
  });

  const iconName: string =
  `${
    path === '/main'
    ?
    isSavedArticle ? 'save-icon-marked' : 'save-icon'
    :
    'trash-icon'
  }`

  const cardStickerClassName: string = classnames('card__sticker card__sticker_type_dropdown', {
    'card__sticker_hidden': isLoggedIn && path === '/main'
  });

  const cardStickerText: string =
  `${
    path === '/main'
    ?
    'Войдите, чтобы сохранять статьи'
    :
    'Убрать из сохранённых'
  }`

  // сохранить статью
  function handleSaveArticle(article: Article): Promise<any> | void {
    if (isLoggedIn) {
      return mainApi.saveArticle(article)
        .then((res) => {
          if (res) {
            getSavedArticles();
          }
        })
        .catch((err) => {
          console.log(`Ошибка при сохранении новости: ${err}`);
        });
    };
  };

  // удалить статью
  function handleDeleteArticle(article: SavedArticle): Promise<any> {
    return mainApi.deleteArticle(article)
      .then((res) => {
        const mySavedArticlesArray: Array<SavedArticle> = mySavedArticles.filter((item: SavedArticle) => (item._id !== article._id));
        dispatch(setMySavedArticlesActionCreator(mySavedArticlesArray));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении новости: ${err}`);
      });
  };

  // колбек при нажатии кнопки на карточке
  function handleArticleClick(article: any): void {
    if (!isLoggedIn) {
      dispatch(setIsLoginPopupOpenActionCreator(true));
    };
    const savedArticle: any = mySavedArticles.find((item: SavedArticle) => item.link === article.url || item.link === article.link);
    if (!savedArticle) {
      handleSaveArticle(article);
    } else {
      handleDeleteArticle(savedArticle);
    };
  };

  return (
    <li className="card">
      <img className="card__image" src={cardsImageLink} alt={cardTitle} />
      <button onClick={() => handleArticleClick(article)} className={'card__button'}>
        <Icon
          className={iconClassName}
          name={iconName}
        />
      </button>
      {
        path === '/saved-news'
        &&
        <p className="card__sticker card__sticker_type_sticky">{cardSticker}</p>
      }
      <p className={cardStickerClassName}>{cardStickerText}</p>
      <div className="card__info">
        <p className="card__date">{setCorrectDate(cardDate)}</p>
        <p className="card__title">{cardTitle}</p>
        <p className="card__subtitle">{cardSubtitle}</p>
        <a href={article.url} target="_blank" rel="noreferrer" className="card__source">{cardSource}</a>
      </div>
    </li>
  );
}

export default NewsCard;
