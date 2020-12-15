import React from 'react';
import './SavedNews.css'
import SavedNewsHeader from './../SavedNewsHeader/SavedNewsHeader';
import NewsCard from './../NewsCard/NewsCard';

const SavedNews = props => {

  const {
    mySavedArticles,
    onArticleClick,
    loggedIn,
  } = props;

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
                mySavedArticles.map((article, index) =>
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
  )
}

export default SavedNews;
