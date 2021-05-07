import { useCallback } from 'react';
import networks from '@bondappetit/networks';

import type { Staking } from 'src/generate/Staking';
import { useDynamicContract, useNetworkConfig } from 'src/common';
import { config } from 'src/config';

export const useStakingContracts = () => {
  const networkConfig = useNetworkConfig();
  const getContract = useDynamicContract<Staking>();

  const handleGetStakingContract = useCallback(
    (contractName: string, chainId: number) => {
      const contracts = config.CHAIN_BINANCE_IDS.includes(chainId)
        ? networks.mainBSC.contracts
        : networkConfig.contracts;

      const contractConfig = contracts[contractName];

      if (!contractConfig) return null;

      return getContract(contractConfig.address, contractConfig.abi, chainId);
    },
    [getContract, networkConfig]
  );

  return handleGetStakingContract;
};
