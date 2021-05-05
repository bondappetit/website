import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useProfitSplitterContract, estimateGas } from 'src/common';

export const useSplit = (balance?: string, updateBalances?: () => void) => {
  const { account = null } = useWeb3React<Web3>();

  const profitSplitterContract = useProfitSplitterContract();

  const handleSplit = useCallback(async () => {
    if (!account || !balance || Number(balance) <= 0 || !profitSplitterContract)
      return;

    const split = profitSplitterContract.methods.split(0);

    await split.send({
      from: account,
      gas: await estimateGas(split, { from: account })
    });

    updateBalances?.();
  }, [profitSplitterContract, account, balance, updateBalances]);

  return handleSplit;
};
