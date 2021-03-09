import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useAsyncRetry, useToggle } from 'react-use';
import Web3 from 'web3';

import {
  BN,
  estimateGas,
  useNetworkConfig,
  useVestingContract,
  useVestingSplitterContract
} from 'src/common';

export const useVestingSplitterInfo = () => {
  const vestingSplitterContract = useVestingSplitterContract();
  const vestingContract = useVestingContract();
  const networkConfig = useNetworkConfig();

  const [loading, toggleLoading] = useToggle(false);

  const { account } = useWeb3React<Web3>();

  const state = useAsyncRetry(async () => {
    if (!vestingContract || !vestingSplitterContract) return;

    const result = await vestingContract.methods
      .info(vestingSplitterContract.options.address)
      .call();

    return result.map(([id, amount, date, description, withdrawal]) => ({
      id,
      amount: new BN(amount).div(
        new BN(10).pow(networkConfig.assets.Governance.decimals)
      ),
      date: Number(date),
      description,
      withdrawal
    }));
  }, [vestingSplitterContract, vestingContract, networkConfig]);

  const handleWithDraw = useCallback(
    async (periodId: string) => {
      if (!account || !vestingSplitterContract || !vestingContract) return;

      toggleLoading(true);

      const vestingWithdraw = vestingSplitterContract.methods.vestingWithdraw(
        vestingContract.options.address,
        periodId
      );

      try {
        await vestingWithdraw.send({
          from: account,
          gas: await estimateGas(vestingWithdraw, {
            from: account
          })
        });

        state.retry();
      } finally {
        toggleLoading(false);
      }
    },
    [vestingSplitterContract, vestingContract, state, account, toggleLoading]
  );

  return [state, handleWithDraw, loading] as const;
};
