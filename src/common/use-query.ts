import { useCallback, useEffect, useRef } from 'react';
import { useAsyncRetry } from 'react-use';

type Body = {
  query: string;
  variables?: unknown;
};

export const useQuery = <T = unknown>(url: string, body: Body) => {
  const state = useAsyncRetry(async () => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    return result as T;
  }, [url]);

  return state;
};

export const useLazyQuery = <T = unknown>(url: string, body: Body) => {
  const bodyRef = useRef(body);

  useEffect(() => {
    bodyRef.current = body;
  }, [body]);

  const get = useCallback(
    async (variables: unknown) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ...bodyRef.current, variables }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      return result as T;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );

  return get;
};
