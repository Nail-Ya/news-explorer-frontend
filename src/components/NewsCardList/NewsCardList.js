import React from 'react';
import './NewsCardList.css'
import NewsCard from './../NewsCard/NewsCard';
import cardImage from './../../images/card.png';
import { Route, Switch } from 'react-router-dom';

const NewsCardList = props => {

  return (
    <Switch>
      <Route path="/main">
        <section className="cards">
          <div className="cards-container">
            <h2 className="cards__title">Результаты поиска</h2>
            <ul className="cards-wrapper">
              <NewsCard
                cardsImageLink={cardImage}
                cardDate={'2 августа, 2019'}
                cardTitle={'Национальное достояние – парки Национальное достояние – парки Национальное достояние – парки'}
                cardSubtitle={'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.'}
                cardSource={'Лента.ру'}
              />
              <NewsCard
                cardsImageLink={cardImage}
                cardDate={'2 августа, 2019'}
                cardTitle={'Национальное достояние – парки Национальное достояние – парки Национальное достояние – парки'}
                cardSubtitle={'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.'}
                cardSource={'Лента.ру'}
              />
              <NewsCard
                cardsImageLink={cardImage}
                cardDate={'2 августа, 2019'}
                cardTitle={'Национальное достояние – парки Национальное достояние – парки Национальное достояние – парки'}
                cardSubtitle={'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.'}
                cardSource={'Лента.ру'}
              />
            </ul>
          </div>
          <button className="cards__button">Показать еще</button>
        </section>
      </Route>

      <Route path="/saved-news">
        <section className="cards cards_type_saved">
          <div className="cards-container">
            <h2 className="cards__title">Результаты поиска</h2>
            <ul className="cards-wrapper cards-wrapper_type_saved">
              <NewsCard
                cardsImageLink={cardImage}
                cardSticker={'Природа'}
                cardDate={'2 августа, 2019'}
                cardTitle={'Национальное достояние – парки Национальное достояние – парки Национальное достояние – парки'}
                cardSubtitle={'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.'}
                cardSource={'Лента.ру'}
              />
              <NewsCard
                cardsImageLink={cardImage}
                cardSticker={'Природа'}
                cardDate={'2 августа, 2019'}
                cardTitle={'Национальное достояние – парки Национальное достояние – парки Национальное достояние – парки'}
                cardSubtitle={'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.'}
                cardSource={'Лента.ру'}
              />
              <NewsCard
                cardsImageLink={cardImage}
                cardSticker={'Природа'}
                cardDate={'2 августа, 2019'}
                cardTitle={'Национальное достояние – парки Национальное достояние – парки Национальное достояние – парки'}
                cardSubtitle={'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.'}
                cardSource={'Лента.ру'}
              />
            </ul>
          </div>
        </section>
      </Route>
    </Switch>
  )
}

export default NewsCardList;
