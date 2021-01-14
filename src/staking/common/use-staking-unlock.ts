import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import Web3 from 'web3';

import { useNetworkConfig } from 'src/common';
import { useStakingContracts } from './use-staking-contracts';

export const useStakingUnlock = (tokenId: string) => {
  const getStakingContract = useStakingContracts();
  const { account } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();

  const handleUnstakeOrClaim = useCallback(
    async (unstake = true) => {
      const currentToken = networkConfig.assets[tokenId];
      const stakingContract = getStakingContract(tokenId);

      if (!currentToken || !account || !stakingContract) return;

      const exit = unstake
        ? stakingContract.methods.exit()
        : stakingContract.methods.getReward();

      await exit.send({
        from: account,
        gas: await exit.estimateGas({ from: account })
      });
    },
    [networkConfig, tokenId, account, getStakingContract]
  );

  return handleUnstakeOrClaim;
};
