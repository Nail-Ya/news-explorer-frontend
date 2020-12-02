import React from 'react';
import './SavedNews.css'
import SavedNewsHeader from './../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from './../NewsCardList/NewsCardList';

const SavedNews = props => {

  return (
    <main className="content">
      <SavedNewsHeader />
      <NewsCardList />
    </main>
  )
}

export default SavedNews;
