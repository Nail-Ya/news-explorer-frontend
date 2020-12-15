import React from 'react';
import './Main.css'
import Search from './../Search/Search';
import NewsCardList from './../NewsCardList/NewsCardList';
import About from './../About/About';
import Preloader from './../Preloader/Preloader';
import NotFound from './../NotFound/NotFound';

const Main = props => {
  const {
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
  } = props;

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
  )
}

export default Main;
