import React from 'react';
import './SavedNewsHeader.scss';
import { Article, SavedArticle, User } from '../../utils/types';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';

const SavedNewsHeader: React.FC = () => {

  const mySavedArticles: Array<SavedArticle> = useSelector((state: RootState) => state.articles.mySavedArticles);
  const currentUser: User = useSelector((state: RootState) => state.user.currentUser);
  const keywordsArray: Array<string> = mySavedArticles.map((item: Article | SavedArticle) => item.keyword);
  const uniqueKeywords: Array<string> = Array.from(new Set(keywordsArray));
  // стейт для выражения 'сохранённых статей'
  const [articlesText, setArticlesText] = React.useState<string>('');

  // функция для подстановки корректного выражения 'сохранённых статей' в зависимости от количества статей
  function setArticleText(articlesLength: number): void {
    if (articlesLength === 1) {
      setArticlesText('сохранённая статья');
    } else if (articlesLength > 1 && articlesLength < 5) {
      setArticlesText('сохранённые статьи');
    } else if (articlesLength >= 5 || articlesLength === 0) {
      setArticlesText('сохранённых статей');
    }
  }

  React.useEffect(() => {
    setArticleText(mySavedArticles.length);
  }, [mySavedArticles]);

  // функция для подстановки корректного окончания выражения '-м другим'
  function endOfTextExpression(num: number): string {
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
  const articleInfoSubtitleText: string =
  `${
    uniqueKeywords.length === 1
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
        { uniqueKeywords.length === 0 ? '' : articleInfoSubtitleText }
        {
          uniqueKeywords.length > 3
          &&
          <>
            <span className="articles-info__span-accent">{`${uniqueKeywords[0]}, ${uniqueKeywords[1]}`}</span>
            &nbsp;и&nbsp;
            <span className="articles-info__span-accent">{`${uniqueKeywords.length - 2}${endOfTextExpression(uniqueKeywords.length - 2)}`}</span>
          </>
        }
        {
          uniqueKeywords.length === 3
          &&
          <span className="articles-info__span-accent">{`${uniqueKeywords[0]}, ${uniqueKeywords[1]} и ${uniqueKeywords[2]}`}</span>
        }
        {
          uniqueKeywords.length === 2
          &&
          <span className="articles-info__span-accent">{`${uniqueKeywords[0]} и ${uniqueKeywords[1]}`}</span>
        }
        {
          uniqueKeywords.length === 1
          &&
          <span className="articles-info__span-accent">{`${uniqueKeywords[0]}`}</span>
        }
      </p>
    </section>
  );
}

export default SavedNewsHeader;
