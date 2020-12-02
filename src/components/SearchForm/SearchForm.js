import React from 'react';
import './SearchForm.css'

const SearchForm = props => {

  return (
    <form action="" className="search__form">
      <input type="text" className="search__input" placeholder="Введите тему новости" required />
      <button className="search__button" type="submit">Искать</button>
    </form>
  )
}

export default SearchForm;
