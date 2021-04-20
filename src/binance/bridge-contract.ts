import { useMemo } from 'react';
import type { AbiItem } from 'web3-utils';

import { useLibrary } from 'src/common';
import type { BridgeAbi } from './bridge-abi.d';
import abi from './bridge-abi.json';

export const useBridgeContract = () => {
  const library = useLibrary();

  return useMemo(
    () =>
      (new library.eth.Contract(
        abi as AbiItem[],
        '0xc8c1b41713761281a520b7ad81544197bc85a4ce'
      ) as unknown) as BridgeAbi,
    [library]
  );
};
