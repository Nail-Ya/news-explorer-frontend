import React from 'react';
import './Main.css';
import Search from '../Search/Search';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { Article, SavedArticle } from '../../utils/interfaces';

export type Props = {
  onChangeRequestValue: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchArticles: (evt: React.FormEvent<HTMLFormElement>) => void;
  isPreloaderShow: boolean;
  isNotFoundShow: boolean;
  errorNewsServer: boolean;
  isNewsCardListShow: boolean;
  articlesToDisplay: Array<Article>;
  onAddArticlesToDisplay: () => void;
  onArticleClick: (article: Article) => void;
  mySavedArticles: Array<SavedArticle>;
  loggedIn: boolean;
};

const Main: React.FC<Props> = ({
  onChangeRequestValue,
  onSearchArticles,
  isPreloaderShow,
  isNotFoundShow,
  errorNewsServer,
  isNewsCardListShow,
  articlesToDisplay,
  onAddArticlesToDisplay,
  onArticleClick,
  mySavedArticles,
  loggedIn,
}) => {

  return (
    <main className="content">
      <Search
        onChangeRequestValue={onChangeRequestValue}
        onSearchArticles={onSearchArticles}
      />
      {
        isPreloaderShow
        &&
        <Preloader />
      }
      {
        isNotFoundShow
        &&
        <NotFound
          errorNewsServer={errorNewsServer}
        />
      }
      {
        isNewsCardListShow
        &&
        <NewsCardList
          articlesToDisplay={articlesToDisplay}
          onAddArticlesToDisplay={onAddArticlesToDisplay}
          onArticleClick={onArticleClick}
          mySavedArticles={mySavedArticles}
          loggedIn={loggedIn}
        />
      }
      <About />
    </main>
  );
}

export default Main;
