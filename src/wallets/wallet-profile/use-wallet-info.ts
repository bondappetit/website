import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { useAsyncRetry } from 'react-use';

import {
  BN,
  useBalance,
  useGovernanceContract,
  useNetworkConfig
} from 'src/common';
import { useGovernanceCost } from 'src/staking';

export const useWalletInfo = () => {
  const { account } = useWeb3React();

  const governanceContract = useGovernanceContract();

  const networkConfig = useNetworkConfig();

  const getBalance = useBalance();

  const { governanceInUSDC } = useGovernanceCost();
  const normalizeGovernanceInUSDC = useMemo(() => {
    if (!governanceInUSDC) return new BN('0');

    return new BN(governanceInUSDC).div(
      new BN(10).pow(networkConfig.assets.USDC.decimals)
    );
  }, [governanceInUSDC, networkConfig.assets.USDC.decimals]);

  return useAsyncRetry(async () => {
    if (!governanceContract || !account || !governanceInUSDC) return;

    const locking = await governanceContract.methods.locking(account).call();

    const asset = networkConfig.assets.Governance;

    const balance = await getBalance({
      tokenName: asset.symbol,
      tokenAddress: asset.address
    });

    const unstakedBAG = new BN(locking.amount);

    const unstakedInBAG = unstakedBAG.minus(balance);

    const USD = networkConfig.assets.USDC;

    return {
      unstaked: {
        inBAG: unstakedInBAG,
        inUSDC: unstakedInBAG
          .multipliedBy(governanceInUSDC)
          .div(new BN(10).pow(USD.decimals))
      },
      locked: {
        inBAG: unstakedBAG,
        inUSDC: unstakedBAG
          .multipliedBy(governanceInUSDC)
          .div(new BN(10).pow(USD.decimals)),
        date: locking.date
      },
      governanceInUSDC: normalizeGovernanceInUSDC
    };
  }, [
    account,
    governanceContract,
    getBalance,
    networkConfig.assets,
    governanceInUSDC,
    normalizeGovernanceInUSDC
  ]);
};