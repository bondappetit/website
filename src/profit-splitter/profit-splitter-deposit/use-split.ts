import { useCallback, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { useProfitSplitterContract } from 'src/common';

export const useSplit = (balance?: string) => {
  const balanceRef = useRef(balance);
  const { account } = useWeb3React<Web3>();

  const profitSplitterContract = useProfitSplitterContract();

  const handleSplit = useCallback(async () => {
    if (
      !profitSplitterContract ||
      !account ||
      !balanceRef.current ||
      Number(balanceRef.current) > 0
    )
      return;

    await profitSplitterContract.methods
      .split(balanceRef.current)
      .send({ from: account });
  }, [profitSplitterContract, account]);

  return handleSplit;
};
