import { useAsyncRetry } from 'react-use';

import { mainApi } from './main-api';

export const useMediumArticles = () => {
  return useAsyncRetry(async () => {
    const articles = await mainApi.getMediumArticles();

    return articles.items?.map((article) => ({
      ...article,
      id: article.guid,
      date: article.pubDate
    }));
  }, []);
};
