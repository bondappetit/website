import { useCallback, useEffect, useMemo, useState } from 'react';
import chunk from 'lodash.chunk';
import range from 'lodash.range';

const LIMIT = 5;

export const usePagination = (limit = LIMIT) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [countItems, setCountItems] = useState(0);

  const [page, setPage] = useState<number[]>([]);

  const pages = useMemo(() => chunk(range(countItems, 0), limit), [
    countItems,
    limit
  ]);

  const nextPage = useCallback(() => {
    if (pages.length - 1 <= currentPage) return;

    setCurrentPage(currentPage + 1);
  }, [currentPage, pages.length]);

  useEffect(() => {
    setPage((previousPage) => [...previousPage, ...(pages[currentPage] ?? [])]);
  }, [countItems, currentPage, pages]);

  return {
    page,
    pages,
    countItems,
    currentPage,
    setCurrentPage,
    setCountItems,
    nextPage
  };
};
