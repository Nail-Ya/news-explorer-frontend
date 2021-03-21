import React from 'react';
import './NewsCardList.scss';
import NewsCard from '../NewsCard/NewsCard';
import { Article } from '../../utils/interfaces';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { setArticlesToDisplayActionCreator } from '../../store/actions/articlesActionCreators';

export type Props = {
  onArticleClick: (article: Article) => void;
};

const NewsCardList: React.FC<Props> = ({
  onArticleClick,
}) => {

  const articlesToDisplay: Array<Article> = useSelector((state: RootState) => state.articles.articlesToDisplay);
  const articles: Array<Article> = useSelector((state: RootState) => state.articles.articles);

  const dispatch = useDispatch();

  // добавляем 3 статьи к показу по кнопке показать еще
  const addArticlesToDisplay = (): void => {
    dispatch(setArticlesToDisplayActionCreator([
      ...articlesToDisplay,
      ...articles.slice(articlesToDisplay.length, articlesToDisplay.length + 3)
    ]));
  };

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
      <button className="cards__button" onClick={addArticlesToDisplay}>Показать еще</button>
    </section>
  );
}

export default NewsCardList;
