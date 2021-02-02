import { useAsyncRetry, useAsyncFn } from 'react-use';

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
  const [state, get] = useAsyncFn(
    async (variables: unknown) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ...body, variables }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      return result as T;
    },
    [url]
  );

  return [get, state] as const;
};
