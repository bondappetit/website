import { useCallback } from 'react';

import type { Staking } from 'src/generate/Staking';
import { useDynamicContract, useNetworkConfig } from 'src/common';

export const useStakingContracts = () => {
  const networkConfig = useNetworkConfig();
  const getContract = useDynamicContract<Staking>();

  const handleGetStakingContract = useCallback(
    (contractName: string) => {
      const contractConfig = networkConfig.contracts[contractName];

      if (!contractConfig) return null;

      return getContract(contractConfig.address, contractConfig.abi);
    },
    [getContract, networkConfig.contracts]
  );

  return handleGetStakingContract;
};
