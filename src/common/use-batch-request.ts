/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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

type Batch<
  T extends (tx?: NonPayableTx | undefined) => Promise<any>
> = T extends (tx?: NonPayableTx | undefined) => Promise<infer R> ? R : T;

const makeBatchRequest = (library: Web3) => <T>(
  calls: readonly (T | PromiseLike<T>)[],
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

  return (Promise.all(promises) as unknown) as Promise<Batch<T>[]>;
};

export const useBatchRequest = () => {
  const library = useLibrary();

  return useCallback(makeBatchRequest(library), [library]);
};
