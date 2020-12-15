import React from 'react';
import './Main.css'
import Search from './../Search/Search';
import NewsCardList from './../NewsCardList/NewsCardList';
import About from './../About/About';

const Main = props => {

  return (
    <main className="content">
      <Search />
      <NewsCardList />
      <About />
    </main>
  )
}

export default Main;
