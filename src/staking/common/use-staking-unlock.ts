import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

import type { Staking } from 'src/generate/Staking';

export const useStakingUnlock = (stakingContract?: Staking) => {
  const { account } = useWeb3React<Web3>();

  const handleUnstakeOrClaim = useCallback(
    async (unstake = true) => {
      if (!account || !stakingContract) return;

      const exit = unstake
        ? stakingContract.methods.exit()
        : stakingContract.methods.getReward();

      await exit.send({
        from: account,
        gas: await exit.estimateGas({ from: account })
      });
    },
    [stakingContract, account]
  );

  return handleUnstakeOrClaim;
};
