import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { useProfitSplitterContract } from 'src/common';

export const useSplit = (balance?: string, updateBalances?: () => void) => {
  const { account } = useWeb3React<Web3>();

  const profitSplitterContract = useProfitSplitterContract();

  const handleSplit = useCallback(async () => {
    if (!profitSplitterContract || !account || !balance || Number(balance) <= 0)
      return;

    await profitSplitterContract.methods.split(0).send({ from: account });

    updateBalances?.();
  }, [profitSplitterContract, account, balance, updateBalances]);

  return handleSplit;
};
