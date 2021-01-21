import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useProfitSplitterContract } from 'src/common';

export const useSplit = (balance?: string, updateBalances?: () => void) => {
  const { account } = useWeb3React<Web3>();

  const profitSplitterContract = useProfitSplitterContract();

  const handleSplit = useCallback(async () => {
    if (!account || !balance || Number(balance) <= 0) return;

    const split = profitSplitterContract.methods.split(0);

    await split.send({
      from: account,
      gas: await split.estimateGas({ from: account })
    });

    updateBalances?.();
  }, [profitSplitterContract, account, balance, updateBalances]);

  return handleSplit;
};
