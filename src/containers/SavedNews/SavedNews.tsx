import React from 'react';
import './SavedNews.scss';
import SavedNewsHeader from '../../components/SavedNewsHeader/SavedNewsHeader';
import NewsCard from '../../components/NewsCard/NewsCard';
import { SavedArticle } from '../../utils/types';
import { RootState } from '../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';

export type Props = {
  getSavedArticles: () => Promise<any>;
};

const SavedNews: React.FC<Props> = ({ getSavedArticles }) => {

  const mySavedArticles: Array<SavedArticle> = useSelector((state: RootState) => state.articles.mySavedArticles);

  return (
    <main className="content">
      <SavedNewsHeader />
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
                    getSavedArticles={getSavedArticles}
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
