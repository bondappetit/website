import { useCallback } from 'react';
import { useAsyncRetry } from 'react-use';
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

  const networkConfig = useNetworkConfig();

  const { account } = useWeb3React<Web3>();

  const state = useAsyncRetry(async () => {
    const result = await getBalance({
      tokenAddress: networkConfig.assets.Governance.address,
      accountAddress: vestingSplitterContract.options.address
    });

    return result.div(new BN(10).pow(networkConfig.assets.Governance.decimals));
  }, [networkConfig, vestingSplitterContract, getBalance]);

  const handleSplitTotalSupply = useCallback(async () => {
    if (!account) return;

    const split = vestingSplitterContract.methods.split(
      networkConfig.assets.Governance.address
    );

    await split.send({
      from: account,
      gas: await estimateGas(split, {
        from: account
      })
    });
  }, [
    account,
    vestingSplitterContract.methods,
    networkConfig.assets.Governance.address
  ]);

  return [state, handleSplitTotalSupply] as const;
};
