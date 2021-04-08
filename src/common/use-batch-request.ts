/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from 'web3-core';
import { useCallback } from 'react';
import Web3 from 'web3';

import { NonPayableTx } from 'src/generate/types';
import { useLibrary } from './use-library';

const isCallable = (
  call: unknown
): call is {
  request: (...args: unknown[]) => Extension['methods'][number];
} => {
  return typeof call === 'function' && call !== null && 'request' in call;
};

type Batch<T> = T extends (tx?: NonPayableTx | undefined) => Promise<infer R>
  ? R
  : T;

const makeBatchRequest = (library: Web3) => <
  T extends ((tx?: NonPayableTx | undefined) => Promise<any>) | any
>(
  calls: T[],
  callFrom?: string | null
): Promise<Batch<T>[]> => {
  const batch = new library.BatchRequest();

  const promises = calls.map((call) => {
    if (!isCallable(call)) return Promise.resolve(call);

    return new Promise((resolve, reject) => {
      const request = call.request(
        { from: callFrom },
        (error: Error, data: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
      batch.add(request);
    });
  });

  batch.execute();

  return Promise.all(promises) as Promise<Batch<T>[]>;
};

export const useBatchRequest = () => {
  const library = useLibrary();

  return useCallback(makeBatchRequest(library), [library]);
};
