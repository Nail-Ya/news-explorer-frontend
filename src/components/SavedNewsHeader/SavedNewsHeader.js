import React from 'react';
import './SavedNewsHeader.css'
import { CurrentUserContext } from './../../context/CurrentUserContext';

const SavedNewsHeader = props => {
  const { mySavedArticles } = props;

  const currentUser = React.useContext(CurrentUserContext);

  const keywordsArray = mySavedArticles.map(item => item = item.keyword)

  const objectWithNumberOfRepeatedKeywords = keywordsArray.reduce((prevVal, item) => {
    if (!prevVal[item]) {
      // если ключа ещё нет в объекте, значит это первое повторение
      prevVal[item] = 1;
    } else {
      // иначе увеличим количество повторений на 1
      prevVal[item] += 1;
    }

    // и вернём изменённый объект
    return prevVal;
  }, {});

  // отсортированный массив по частоте повторений keywords
  const sortedKeywordsArray = Object.keys(objectWithNumberOfRepeatedKeywords).sort((a, b) => {
    return objectWithNumberOfRepeatedKeywords[b] - objectWithNumberOfRepeatedKeywords[a];
  })

  // стейт для выражения 'сохранённых статей'
  const [articlesText, setArticlesText] = React.useState('');

  // функция для подстановки корректного выражения 'сохранённых статей' в зависимости от количества статей
  function setArticleText(articles) {
    if (articles === 1) {
      setArticlesText('сохранённая статья');
    } else if (articles > 1 && articles < 5) {
      setArticlesText('сохранённые статьи');
    } else if (articles >= 5 || articles === 0) {
      setArticlesText('сохранённых статей');
    }
  }

  React.useEffect(() => {
    setArticleText(mySavedArticles.length);
  }, [mySavedArticles])

  // функция для подстановки корректного окончания выражения '-м другим'
  function endOfTextExpression(num) {
    if (String(num).endsWith('1') && !String(num).endsWith('11')) {
      return '-му другому';
    } else if (String(num).endsWith('2') && !String(num).endsWith('12')) {
      return '-м другим';
    } else if (String(num).endsWith('3') && !String(num).endsWith('13')) {
      return '-м другим';
    } else if (String(num).endsWith('4') && !String(num).endsWith('14')) {
      return '-м другим';
    }
    return '-и другим';
  }

  // фраза 'По ключевым словам' в зависимости от количества статей
  const articleInfoSubtitleText =
  `${
    sortedKeywordsArray.length === 1
    ?
    'По ключевому слову: '
    :
    'По ключевым словам: '
  }`

  return (
    <section className="articles-info">
      <p className="articles-info__text">Сохранённые статьи</p>
      <h1 className="articles-info__title">{currentUser.name}, у вас {mySavedArticles.length} {articlesText}</h1>
      <p className="articles-info__subtitle">
        { sortedKeywordsArray.length === 0 ? '' : articleInfoSubtitleText }
        {
          sortedKeywordsArray.length > 3
          &&
          <>
            <span className="articles-info__span-accent">{`${sortedKeywordsArray[0]}, ${sortedKeywordsArray[1]}`}</span>
            &nbsp;и&nbsp;
            <span className="articles-info__span-accent">{`${sortedKeywordsArray.length - 2}${endOfTextExpression(sortedKeywordsArray.length - 2)}`}</span>
          </>
        }
        {
          sortedKeywordsArray.length === 3
          &&
          <span className="articles-info__span-accent">{`${sortedKeywordsArray[0]}, ${sortedKeywordsArray[1]} и ${sortedKeywordsArray[2]}`}</span>
        }
        {
          sortedKeywordsArray.length === 2
          &&
          <span className="articles-info__span-accent">{`${sortedKeywordsArray[0]} и ${sortedKeywordsArray[1]}`}</span>
        }
        {
          sortedKeywordsArray.length === 1
          &&
          <span className="articles-info__span-accent">{`${sortedKeywordsArray[0]}`}</span>
        }
      </p>
    </section>
  )
}

export default SavedNewsHeader;
