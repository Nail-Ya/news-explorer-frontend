import React from 'react';
import './Search.scss';
import SearchForm from './../SearchForm/SearchForm';

export type Props = {
  onChangeRequestValue: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchArticles: (evt: React.FormEvent<HTMLFormElement>) => void;
};

const Search: React.FC<Props> = ({
  onChangeRequestValue,
  onSearchArticles,
}) => {

  return (
    <section className="search">
      <div className="search-container">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <SearchForm
          onChangeRequestValue={onChangeRequestValue}
          onSearchArticles={onSearchArticles}
        />
      </div>
    </section>
  );
}

export default Search;
