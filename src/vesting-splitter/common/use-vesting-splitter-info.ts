import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useAsyncRetry } from 'react-use';
import Web3 from 'web3';

import {
  estimateGas,
  useVestingContract,
  useVestingSplitterContract
} from 'src/common';

export const useVestingSplitterInfo = () => {
  const vestingSplitterContract = useVestingSplitterContract();
  const vestingContract = useVestingContract();

  const { account } = useWeb3React<Web3>();

  const state = useAsyncRetry(async () => {
    const result = await vestingContract.methods
      .info(vestingSplitterContract.options.address)
      .call();

    return result.map(([id, amount, date, description, withdrawal]) => ({
      id,
      amount,
      date,
      description,
      withdrawal
    }));
  }, [vestingSplitterContract, vestingContract]);

  const handleWithDraw = useCallback(
    async (periodId: string) => {
      if (!account) return;

      const vestingWithdraw = vestingSplitterContract.methods.vestingWithdraw(
        vestingContract.options.address,
        periodId
      );

      await vestingWithdraw.send({
        from: account,
        gas: await estimateGas(vestingWithdraw, {
          from: account
        })
      });

      state.retry();
    },
    [vestingSplitterContract, vestingContract.options.address, state, account]
  );

  return [state, handleWithDraw] as const;
};
