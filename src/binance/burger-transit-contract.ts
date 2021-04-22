import { useMemo } from 'react';
import type { AbiItem } from 'web3-utils';

import { useLibrary } from 'src/common';
import type { BurgerTransit } from './burger-transit.d';
import abi from './burger-transit.json';

const ADDRESS = '0x3f621973a1363c2ecc8b256e9c0a1c3e62d2cefe';

export const useTransitContract = () => {
  const library = useLibrary();

  return useMemo(
    () =>
      (new library.eth.Contract(
        abi as AbiItem[],
        ADDRESS
      ) as unknown) as BurgerTransit,
    [library]
  );
};