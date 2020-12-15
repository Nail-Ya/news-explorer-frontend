import React from 'react';
import './SearchForm.css'

const SearchForm = props => {
  const {
    onSearchArticles,
    onChangeRequestValue
  } = props;

  return (
    <form className="search__form" onSubmit={onSearchArticles}>
      <input
        type="text"
        className="search__input"
        placeholder="Введите тему новости"
        onChange={onChangeRequestValue}
        required
      />
      <button className="search__button" type="submit">Искать</button>
    </form>
  )
}

export default SearchForm;
