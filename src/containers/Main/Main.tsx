import React from 'react';
import './Main.scss';
import Search from '../../components/Search/Search';
import NewsCardList from '../../components/NewsCardList/NewsCardList';
import About from '../../components/About/About';
import Preloader from '../../components/UI/Preloader/Preloader';
import NotFound from '../../components/NotFound/NotFound';
import { Article } from '../../utils/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from './../../store/reducers/rootReducer';

export type Props = {
  onAddArticlesToDisplay: () => void;
  onArticleClick: (article: Article) => void;
};

const Main: React.FC<Props> = ({
  onAddArticlesToDisplay,
  onArticleClick,
}) => {

  const isPreloaderShow: boolean = useSelector((state: RootState) => state.componentsVisibility.isPreloaderShow);
  const isNotFoundShow: boolean = useSelector((state: RootState) => state.componentsVisibility.isNotFoundShow);
  const isNewsCardListShow: boolean = useSelector((state: RootState) => state.componentsVisibility.isNewsCardListShow);

  return (
    <main className="content">
      <Search />
      {
        isPreloaderShow
        &&
        <Preloader />
      }
      {
        isNotFoundShow
        &&
        <NotFound />
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
