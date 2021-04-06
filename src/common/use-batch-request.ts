// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback } from 'react';

import { useLibrary } from './use-library';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isCallable = (
  call: unknown
): call is { request: (...args: unknown[]) => Promise<void> } => {
  return typeof call === 'object' && call !== null && 'request' in call;
};

export const useBatchRequest = () => {
  const library = useLibrary();

  return useCallback(
    function makeBatchRequest<T>(calls: T[], callFrom?: string | null) {
      const batch = new library.BatchRequest();

      const promises = calls.map((call) => {
        return new Promise((resolve, reject) => {
          const request = call.request({ from: callFrom }, (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
          batch.add(request);
        });
      });

      batch.execute();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.all(promises as any[]);
    },
    [library]
  );
};
