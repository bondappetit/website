import { useLazyQuery } from './use-query';

const url = 'https://cache.bondappetit.io/api';

const QUERY = `
  query {
    mediumPostList {
      guid
      title
      pubDate
      link
    }
  }
`;

export type Article = {
  guid: string;
  title: string;
  pubDate: string;
  link: string;
};

export type ArticlePayload = {
  data: {
    mediumPostList: Article[];
  };
};

export const useMediumArticleList = () =>
  useLazyQuery<ArticlePayload>(url, {
    query: QUERY
  });
