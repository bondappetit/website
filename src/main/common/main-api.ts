const MEDIUM_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/bondappetit';

type MediumArticle = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
};

export const mainApi = {
  getMediumArticles: () =>
    fetch(MEDIUM_URL).then((res) => res.json()) as Promise<{
      items?: MediumArticle[];
    }>
};
