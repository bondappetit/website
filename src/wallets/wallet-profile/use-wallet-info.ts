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

  const state = useAsyncRetry(async () => {
    if (!governanceContract || !account || !governanceInUSDC) return;

    const locking = await governanceContract.methods.locking(account).call();

    const asset = networkConfig.assets.Governance;

    const balance = await getBalance({
      tokenName: asset.symbol,
      tokenAddress: asset.address
    });

    const unstakedBAG = new BN(locking.amount);

    const unstakedInBAG = balance.minus(unstakedBAG);

    const USD = networkConfig.assets.USDC;
    const unstakedInUSDC = unstakedInBAG
      .multipliedBy(governanceInUSDC)
      .div(new BN(10).pow(USD.decimals));

    const lockedUSDC = unstakedBAG
      .multipliedBy(governanceInUSDC)
      .div(new BN(10).pow(USD.decimals));

    return {
      unstaked: {
        inBAG: unstakedInBAG.isLessThan(0) ? new BN(0) : unstakedInBAG,
        inUSDC: unstakedInUSDC.isLessThan(0) ? new BN(0) : unstakedInUSDC
      },
      locked: {
        inBAG: unstakedBAG.isLessThan(0) ? new BN(0) : unstakedBAG,
        inUSDC: lockedUSDC.isLessThan(0) ? new BN(0) : lockedUSDC,
        date: locking.date
      }
    };
  }, [
    account,
    governanceContract,
    getBalance,
    networkConfig.assets,
    governanceInUSDC
  ]);

  return {
    state,
    governanceInUSDC: normalizeGovernanceInUSDC
  };
};
