import React from 'react';
import './NewsCard.css';
import { Route, Switch } from 'react-router-dom';

const NewsCard = props => {
  const {cardsImageLink, cardSticker, cardDate, cardTitle, cardSubtitle, cardSource} = props;

  return (
    <Switch>
      <Route path="/main">
        <li className="card">
          <img className="card__image" src={cardsImageLink} alt={cardTitle} />
          <button className="card__button card__button_type_save"></button>
          <p className="card__sticker card__sticker_type_dropdown">Войдите, чтобы сохранять статьи</p>
          <div className="card__info">
            <p className="card__date">{cardDate}</p>
            <p className="card__title">{cardTitle}</p>
            <p className="card__subtitle">{cardSubtitle}</p>
            <a href="https://lenta.ru/" target="_blank" rel="noreferrer" className="card__source">{cardSource}</a>
          </div>
        </li>
      </Route>

      <Route path="/saved-news">
        <li className="card">
          <img className="card__image" src={cardsImageLink} alt={cardTitle} />
          <button className="card__button card__button_type_delete"></button>
          <p className="card__sticker card__sticker_type_sticky">{cardSticker}</p>
          <p className="card__sticker card__sticker_type_dropdown">Убрать из сохранённых</p>
          <div className="card__info">
            <p className="card__date">{cardDate}</p>
            <p className="card__title">{cardTitle}</p>
            <p className="card__subtitle">{cardSubtitle}</p>
            <a href="https://lenta.ru/" target="_blank" rel="noreferrer" className="card__source">{cardSource}</a>
          </div>
        </li>
      </Route>
    </Switch>
  )
}

export default NewsCard;
