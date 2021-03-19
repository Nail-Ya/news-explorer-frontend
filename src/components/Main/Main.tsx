import React from 'react';
import './Main.scss';
import Search from '../Search/Search';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { Article } from '../../utils/interfaces';

export type Props = {
  onChangeRequestValue: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchArticles: (evt: React.FormEvent<HTMLFormElement>) => void;
  isPreloaderShow: boolean;
  isNotFoundShow: boolean;
  errorNewsServer: boolean;
  isNewsCardListShow: boolean;
  onAddArticlesToDisplay: () => void;
  onArticleClick: (article: Article) => void;
};

const Main: React.FC<Props> = ({
  onChangeRequestValue,
  onSearchArticles,
  isPreloaderShow,
  isNotFoundShow,
  errorNewsServer,
  isNewsCardListShow,
  onAddArticlesToDisplay,
  onArticleClick,
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
          onAddArticlesToDisplay={onAddArticlesToDisplay}
          onArticleClick={onArticleClick}
        />
      }
      <About />
    </main>
  );
}

export default Main;
