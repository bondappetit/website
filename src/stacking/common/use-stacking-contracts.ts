import { useCallback } from 'react';

import type { Staking } from 'src/generate/Staking';
import { useGovStackingContract, useStableStackingContract } from 'src/common';

export const useStackingContracts = () => {
  const govStackingContract = useGovStackingContract();
  const stableStackingContract = useStableStackingContract();

  const handleGetContract = useCallback(
    (tokenName: string) => {
      const contracts: Record<string, Staking> = {
        Governance: govStackingContract,
        Stable: stableStackingContract
      };

      const stackingContract = contracts[tokenName];

      if (!stackingContract) return;

      return stackingContract;
    },
    [govStackingContract, stableStackingContract]
  );

  return handleGetContract;
};
