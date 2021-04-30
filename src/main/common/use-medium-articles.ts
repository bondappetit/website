import { useAsyncRetry } from 'react-use';
import { useMediumArticleList } from 'src/common/use-medium-article-list';

export const useMediumArticles = () => {
  const getMediumArticleList = useMediumArticleList();

  return useAsyncRetry(async () => {
    const articles = await getMediumArticleList({});

    return articles.data.mediumPostList.slice(0, 3);
  }, []);
};
