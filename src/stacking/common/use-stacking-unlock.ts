import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import Web3 from 'web3';

import { useNetworkConfig } from 'src/common';
import { useStackingContracts } from './use-stacking-contracts';

export const useStackingUnlock = (tokenId: string) => {
  const getStackingContract = useStackingContracts();
  const { account } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();

  const handleUnstakeOrClaim = useCallback(
    async (unstake = true) => {
      const currentToken = networkConfig.assets[tokenId];
      const stackingContract = getStackingContract(tokenId);

      if (!currentToken || !account || !stackingContract) return;

      const exit = unstake
        ? stackingContract.methods.exit()
        : stackingContract.methods.getReward();

      const gas = 2000000;

      await exit.send({
        from: account,
        gas
      });
    },
    [networkConfig, tokenId, account, getStackingContract]
  );

  return handleUnstakeOrClaim;
};
