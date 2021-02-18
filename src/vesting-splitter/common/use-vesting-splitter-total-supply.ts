import { useCallback } from 'react';
import { useAsyncRetry, useToggle } from 'react-use';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  BN,
  estimateGas,
  useBalance,
  useNetworkConfig,
  useVestingSplitterContract
} from 'src/common';

export const useVestingSplitterTotalSupply = () => {
  const vestingSplitterContract = useVestingSplitterContract();
  const getBalance = useBalance();

  const [loading, toggleLoading] = useToggle(false);

  const networkConfig = useNetworkConfig();

  const { account } = useWeb3React<Web3>();

  const state = useAsyncRetry(async () => {
    const result = await getBalance({
      tokenAddress: networkConfig.assets.Governance.address,
      accountAddress: vestingSplitterContract.options.address
    });

    const totalSupply = await vestingSplitterContract.methods
      .totalSupply(networkConfig.assets.Governance.address)
      .call();

    return result
      .minus(new BN(totalSupply))
      .div(new BN(10).pow(networkConfig.assets.Governance.decimals));
  }, [networkConfig, vestingSplitterContract, getBalance]);

  const handleSplitTotalSupply = useCallback(async () => {
    if (!account) return;

    toggleLoading(true);

    const split = vestingSplitterContract.methods.split(
      networkConfig.assets.Governance.address
    );

    try {
      await split.send({
        from: account,
        gas: await estimateGas(split, {
          from: account
        })
      });

      state.retry();
    } finally {
      toggleLoading(false);
    }
  }, [
    account,
    vestingSplitterContract.methods,
    networkConfig.assets.Governance.address,
    toggleLoading,
    state
  ]);

  return [state, handleSplitTotalSupply, loading] as const;
};
