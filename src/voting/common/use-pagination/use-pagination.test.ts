import { renderHook, act } from '@testing-library/react-hooks';

import { usePagination } from './use-pagination';

const pagination = {
  page: [100, 99, 98, 97, 96],
  pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
};

it('usePagination should return page with pages', () => {
  const { result } = renderHook(() => usePagination());

  act(() => {
    result.current.setCountItems(100);
  });

  expect(result.current).toStrictEqual(expect.objectContaining(pagination));
});
