import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { Article, SavedArticle } from '../../utils/interfaces';

export type Props = {
  articlesToDisplay: Array<Article>;
  onArticleClick: (article: Article) => void;
  mySavedArticles: Array<SavedArticle>;
  loggedIn: boolean;
  onAddArticlesToDisplay: () => void;
};

const NewsCardList: React.FC<Props> = ({
  articlesToDisplay,
  onArticleClick,
  mySavedArticles,
  loggedIn,
  onAddArticlesToDisplay,
}) => {

  return (
    <section className="cards">
      <div className="cards-container">
        <h2 className="cards__title">Результаты поиска</h2>
        <ul className="cards-wrapper">
          {
            articlesToDisplay.map((article: Article, index: number) =>
              <NewsCard
                article={article}
                key={index}
                cardsImageLink={article.urlToImage}
                cardDate={article.publishedAt}
                cardTitle={article.title}
                cardSubtitle={article.description}
                cardSource={article.source.name}
                onArticleClick={onArticleClick}
                mySavedArticles={mySavedArticles}
                loggedIn={loggedIn}
              />
            )
          }
        </ul>
      </div>
      <button className="cards__button" onClick={onAddArticlesToDisplay}>Показать еще</button>
    </section>
  );
}

export default NewsCardList;
