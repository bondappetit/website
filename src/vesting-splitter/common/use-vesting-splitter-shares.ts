import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useAsyncRetry } from 'react-use';
import {
  BN,
  estimateGas,
  useNetworkConfig,
  useVestingSplitterContract
} from 'src/common';
import Web3 from 'web3';

export const useVestingsplitterShares = () => {
  const vestingSplitterContract = useVestingSplitterContract();

  const networkConfig = useNetworkConfig();

  const { account } = useWeb3React<Web3>();

  const state = useAsyncRetry(async () => {
    const accounts = await vestingSplitterContract.methods.getAccounts().call();

    const result = accounts.map(async (accountAddress) => {
      const share = await vestingSplitterContract.methods
        .shareOf(accountAddress)
        .call();

      const balance = await vestingSplitterContract.methods
        .balanceOf(networkConfig.assets.Governance.address, accountAddress)
        .call();

      return {
        account: accountAddress,
        canWithdraw: account === accountAddress,
        share,
        balance: new BN(balance).div(
          new BN(10).pow(networkConfig.assets.Governance.decimals)
        )
      };
    });

    const owner = await vestingSplitterContract.methods.owner().call();

    const hasButtons = owner === account;

    const shares = await Promise.all(result);

    const accountsWithSharesMap = shares.reduce(
      (acc, sharesItem) => acc.set(sharesItem.account, sharesItem.share),
      new Map<string, string>()
    );

    return {
      shares,
      hasButtons,
      accountsWithSharesMap
    };
  }, [
    vestingSplitterContract,
    account,
    networkConfig.assets.Governance.address
  ]);

  const handleWithDraw = useCallback(async () => {
    if (!account) return;

    const withDraw = vestingSplitterContract.methods.withdraw(
      networkConfig.assets.Governance.address
    );

    await withDraw.send({
      from: account,
      gas: await estimateGas(withDraw, {
        from: account
      })
    });
  }, [
    vestingSplitterContract,
    account,
    networkConfig.assets.Governance.address
  ]);

  const handleChangeShares = useCallback(
    async (accounts: string[], shares: string[]) => {
      if (!account || !state.value) return;

      const changeShares = vestingSplitterContract.methods.changeShares(
        accounts,
        shares
      );

      await changeShares.send({
        from: account,
        gas: await estimateGas(changeShares, {
          from: account
        })
      });

      state.retry();
    },
    [state, vestingSplitterContract, account]
  );

  return [state, handleWithDraw, handleChangeShares] as const;
};
