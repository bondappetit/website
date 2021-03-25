import { useMemo } from 'react';

import { BN } from 'src/common';
import { APYWithTokenName } from './use-staking-tokens';

export const useTotalValueLocked = (
  stakingBalancesWithApy?: APYWithTokenName[]
) => {
  return useMemo(
    () =>
      stakingBalancesWithApy?.reduce(
        (sum, { totalSupply, stakingTokenUSDC }) => {
          return sum.plus(new BN(totalSupply).multipliedBy(stakingTokenUSDC));
        },
        new BN('0')
      ),
    [stakingBalancesWithApy]
  );
};
