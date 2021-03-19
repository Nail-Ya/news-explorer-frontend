import React from 'react';
import './SearchForm.scss';

export type Props = {
  onChangeRequestValue: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchArticles: (evt: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm: React.FC<Props> = ({
  onChangeRequestValue,
  onSearchArticles,
}) => {

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
  );
}

export default SearchForm;
