import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

import { useStakingContracts } from './use-staking-contracts';

export const useStakingUnlock = (contractName?: string) => {
  const getStakingContract = useStakingContracts();
  const { account } = useWeb3React<Web3>();

  const handleUnstakeOrClaim = useCallback(
    async (unstake = true) => {
      if (!contractName) return;

      const stakingContract = getStakingContract(contractName);

      if (!account || !stakingContract) return;

      const exit = unstake
        ? stakingContract.methods.exit()
        : stakingContract.methods.getReward();

      await exit.send({
        from: account,
        gas: await exit.estimateGas({ from: account })
      });
    },
    [contractName, account, getStakingContract]
  );

  return handleUnstakeOrClaim;
};
