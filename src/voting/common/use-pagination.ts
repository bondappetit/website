import { useCallback, useMemo, useState } from 'react';
import chunk from 'lodash.chunk';
import range from 'lodash.range';

const LIMIT = 5;

export const usePagination = (limit = LIMIT) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [countItems, setCountItems] = useState(0);

  const getPages = useCallback(
    (count: number) => {
      setCountItems(count);

      return chunk(range(count, 0), limit)[currentPage];
    },
    [limit, currentPage]
  );

  const pages = useMemo(() => chunk(range(countItems, 0), limit), [
    countItems,
    limit
  ]);

  const nextPage = useCallback(() => {
    if (pages.length - 1 <= currentPage) return;

    setCurrentPage(currentPage + 1);
  }, [currentPage, pages.length]);

  return {
    pages,
    getPages,
    nextPage
  };
};
