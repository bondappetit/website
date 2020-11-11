import { useMemo, useState } from 'react';
import chunk from 'lodash.chunk';
import range from 'lodash.range';

const LIMIT = 5;

export const usePagination = (limit = LIMIT) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [countItems, setCountItems] = useState(0);

  return useMemo(() => {
    const pages = chunk(range(countItems, 0), limit);

    return {
      pages: pages.map((_, index) => index),
      page: pages[currentPage] ?? [],
      countItems,
      currentPage,
      setCurrentPage,
      setCountItems,
      nextPage: () => {
        if (pages.length <= currentPage) return;
        setCurrentPage(currentPage + 1);
      },
      prevPage: () => {
        if (pages.length >= currentPage) return;
        setCurrentPage(currentPage - 1);
      }
    };
  }, [countItems, currentPage, limit]);
};
