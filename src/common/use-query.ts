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
