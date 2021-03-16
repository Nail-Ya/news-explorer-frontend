import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from './../SavedNewsHeader/SavedNewsHeader';
import NewsCard from './../NewsCard/NewsCard';
import { Article, SavedArticle } from '../../utils/interfaces';

export type Props = {
  mySavedArticles: Array<Article | SavedArticle>;
  onArticleClick: (article: Article | SavedArticle) => void;
  loggedIn: boolean;
};

const SavedNews: React.FC<Props> = ({
  mySavedArticles,
  onArticleClick,
  loggedIn,
}) => {
  return (
    <main className="content">
      <SavedNewsHeader
        mySavedArticles={mySavedArticles}
      />
      {
        mySavedArticles.length > 0
        &&
        <section className="cards cards_type_saved">
          <div className="cards-container">
            <ul className="cards-wrapper cards-wrapper_type_saved">
              {
                mySavedArticles.map((article: any, index: number) =>
                  <NewsCard
                    article={article}
                    key={index}
                    cardsImageLink={article.image}
                    cardDate={article.date}
                    cardTitle={article.title}
                    cardSubtitle={article.text}
                    cardSource={article.source.name || article.source}
                    cardSticker={article.keyword}
                    onArticleClick={onArticleClick}
                    mySavedArticles={mySavedArticles}
                    loggedIn={loggedIn}
                  />
                )
              }
            </ul>
          </div>
        </section>
      }
    </main>
  );
}

export default SavedNews;
