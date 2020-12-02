import React from 'react';
import './SavedNewsHeader.css'

const SavedNewsHeader = props => {

  return (
    <section class="articles-info">
      <p class="articles-info__text">Сохранённые статьи</p>
      <h1 class="articles-info__title">Грета, у вас 5 сохранённых статей</h1>
      <p class="articles-info__subtitle">По ключевым словам:&nbsp;
        <span class="articles-info__span-accent">Природа, Тайга</span>
        &nbsp;и&nbsp;
        <span class="articles-info__span-accent">2-м другим</span>
      </p>
    </section>
  )
}

export default SavedNewsHeader;
