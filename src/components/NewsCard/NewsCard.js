import React from 'react';
import './NewsCard.css';
import { useLocation } from 'react-router-dom';

const NewsCard = props => {
  const {
    cardsImageLink,
    cardSticker,
    cardDate,
    cardTitle,
    cardSubtitle,
    cardSource,
    mySavedArticles,
    article,
    onArticleClick,
    loggedIn,
  } = props;

  const path = useLocation().pathname;

  // определение сохраненной статьи
  const isSavedArticle = mySavedArticles.some((item) => {
    return item.link === article.url;
  })

  // сохранение / удаление статьи
  function handleButtonClick() {
    onArticleClick(article);
  }

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
    loggedIn && path === '/main'
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

  // приведение даты к читаемому формату
  const dateOptions = {
    month: 'long',
    day: 'numeric',
  };
  const articleDate = new Date(cardDate);
  const dayAndMonth = articleDate.toLocaleString('ru', dateOptions);
  const correctArticleDate = `${dayAndMonth}, ${articleDate.getFullYear()}`;

  return (
    <li className="card">
      <img className="card__image" src={cardsImageLink} alt={cardTitle} />
      <button onClick={handleButtonClick} className={cardButtonClassName}></button>
      {
        path === '/saved-news'
        &&
        <p className="card__sticker card__sticker_type_sticky">{cardSticker}</p>
      }
      <p className={cardStickerClassName}>{cardStickerText}</p>
      <div className="card__info">
        <p className="card__date">{correctArticleDate}</p>
        <p className="card__title">{cardTitle}</p>
        <p className="card__subtitle">{cardSubtitle}</p>
        <a href={article.url} target="_blank" rel="noreferrer" className="card__source">{cardSource}</a>
      </div>
    </li>
  )
}

export default NewsCard;
