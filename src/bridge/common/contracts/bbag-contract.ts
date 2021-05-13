import { useMemo } from 'react';
import type { AbiItem } from 'web3-utils';

import { useLibrary } from 'src/common';
import type { BbagAbi } from '../types/bbag-abi';
import abi from '../abi/bbag-abi.json';

const ADDRESS = '0x1AD0132D8B5Ef3cEBDA1A9692f36AC30be871b6b';

export const useBBagContract = () => {
  const library = useLibrary(true);

  return useMemo(
    () =>
      (new library.eth.Contract(
        abi as AbiItem[],
        ADDRESS
      ) as unknown) as BbagAbi,
    [library]
  );
};
