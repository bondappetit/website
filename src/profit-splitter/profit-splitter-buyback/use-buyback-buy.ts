import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import Web3 from 'web3';

import { useBuybackContract } from 'src/common';

export const useBuybackBuy = (balance: string) => {
  const buybackContract = useBuybackContract();

  const { account } = useWeb3React<Web3>();

  const handleBuy = useCallback(async () => {
    const buy = buybackContract?.methods.buy(balance);

    if (!buy || !account || Number(balance) <= 0) return;

    await buy.send({
      from: account,
      gas: await buy.estimateGas({ from: account })
    });
  }, [buybackContract, balance, account]);

  return handleBuy;
};
