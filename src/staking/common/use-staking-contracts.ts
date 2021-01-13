import { useCallback } from 'react';

import type { Staking } from 'src/generate/Staking';
import { useGovStakingContract, useStableStakingContract } from 'src/common';

export const useStakingContracts = () => {
  const govStakingContract = useGovStakingContract();
  const stableStakingContract = useStableStakingContract();

  const handleGetContract = useCallback(
    (tokenName: string) => {
      const contracts: Record<string, Staking> = {
        Governance: govStakingContract,
        Stable: stableStakingContract
      };

      const stakingContract = contracts[tokenName];

      if (!stakingContract) return;

      return stakingContract;
    },
    [govStakingContract, stableStakingContract]
  );

  return handleGetContract;
};
