import React from 'react';
import './Search.scss';
import SearchForm from './../SearchForm/SearchForm';

const Search: React.FC = () => (
  <section className="search">
    <div className="search-container">
      <h1 className="search__title">
        Что творится в мире?
      </h1>
      <p className="search__subtitle">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
      </p>
      <SearchForm />
    </div>
  </section>
);

export default Search;
