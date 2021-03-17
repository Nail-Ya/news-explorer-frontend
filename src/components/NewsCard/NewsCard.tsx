import React from 'react';
import './NewsCard.css';
import { useLocation } from 'react-router-dom';
import { Article, SavedArticle } from '../../utils/interfaces';
import { setCorrectDate } from '../../utils/constants';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';

export type Props = {
  cardsImageLink: string;
  cardSticker?: string;
  cardDate: string;
  cardTitle: string;
  cardSubtitle: string;
  cardSource: string;
  article: Article;
  onArticleClick: (article: Article) => void;
};

const NewsCard: React.FC<Props> = ({
  cardsImageLink,
  cardSticker,
  cardDate,
  cardTitle,
  cardSubtitle,
  cardSource,
  article,
  onArticleClick,
}) => {

  const path: string = useLocation().pathname;
  const mySavedArticles: Array<SavedArticle> = useSelector((state: RootState) => state.articles.mySavedArticles);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);

  // определение сохраненной статьи
  const isSavedArticle: boolean = mySavedArticles.some((item: Article | SavedArticle) => {
    return item.link === article.url;
  });

  // значения className в зависимости от пути
  const cardButtonClassName =
  `${
    path === '/main'
    ?
    isSavedArticle ? 'card__button card__button_type_save-marked' : 'card__button card__button_type_save'
    :
    'card__button card__button_type_delete'
  }`

  const cardStickerClassName =
  `${
    isLoggedIn && path === '/main'
    ?
    'card__sticker card__sticker_type_dropdown card__sticker_hidden'
    :
    'card__sticker card__sticker_type_dropdown'
  }`

  const cardStickerText =
  `${
    path === '/main'
    ?
    'Войдите, чтобы сохранять статьи'
    :
    'Убрать из сохранённых'
  }`

  return (
    <li className="card">
      <img className="card__image" src={cardsImageLink} alt={cardTitle} />
      <button onClick={() => onArticleClick(article)} className={cardButtonClassName}></button>
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
