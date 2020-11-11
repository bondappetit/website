import { useCallback, useMemo, useState } from 'react';
import chunk from 'lodash.chunk';
import range from 'lodash.range';

const LIMIT = 5;

export const usePagination = (limit = LIMIT) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [countItems, setCountItems] = useState(0);

  const pages = useMemo(() => chunk(range(countItems, 0), limit), [
    countItems,
    limit
  ]);
  const page = useMemo(() => pages[currentPage] ?? [], [currentPage, pages]);
  const pagesIds = useMemo(() => pages.map((_, index) => index), [pages]);

  const nextPage = useCallback(() => {
    if (pages.length - 1 <= currentPage) return;

    setCurrentPage(currentPage + 1);
  }, [currentPage, pages.length]);

  const prevPage = useCallback(() => {
    if (currentPage === 0) return;

    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  return {
    pages: pagesIds,
    page,
    countItems,
    currentPage,
    setCurrentPage,
    setCountItems,
    nextPage,
    prevPage
  };
};
