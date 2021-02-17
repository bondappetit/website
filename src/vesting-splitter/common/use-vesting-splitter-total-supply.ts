import { useCallback } from 'react';
import { useAsyncRetry } from 'react-use';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  BN,
  estimateGas,
  useNetworkConfig,
  useVestingSplitterContract
} from 'src/common';

export const useVestingSplitterTotalSupply = () => {
  const vestingSplitterContract = useVestingSplitterContract();

  const networkConfig = useNetworkConfig();

  const { account } = useWeb3React<Web3>();

  const state = useAsyncRetry(async () => {
    const result = await vestingSplitterContract.methods
      .totalSupply(networkConfig.assets.Governance.address)
      .call();

    return new BN(result).div(
      new BN(10).pow(networkConfig.assets.Governance.decimals)
    );
  }, [networkConfig, vestingSplitterContract]);

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
