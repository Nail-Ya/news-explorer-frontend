import React from 'react';
import './NewsCardList.scss';
import NewsCard from '../NewsCard/NewsCard';
import { Article } from '../../utils/interfaces';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';

export type Props = {
  onArticleClick: (article: Article) => void;
  onAddArticlesToDisplay: () => void;
};

const NewsCardList: React.FC<Props> = ({
  onArticleClick,
  onAddArticlesToDisplay,
}) => {

  const articlesToDisplay: Array<Article> = useSelector((state: RootState) => state.articles.articlesToDisplay);

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
