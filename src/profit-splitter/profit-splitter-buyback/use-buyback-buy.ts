import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useBuybackContract, estimateGas } from 'src/common';

export const useBuybackBuy = (balance: string, updateBalances?: () => void) => {
  const buybackContract = useBuybackContract();

  const { account = null } = useWeb3React<Web3>();

  const handleBuy = useCallback(async () => {
    if (!buybackContract) return;

    const buy = buybackContract.methods.buy(0);

    if (!account || Number(balance) <= 0) return;

    await buy.send({
      from: account,
      gas: await estimateGas(buy, { from: account })
    });

    updateBalances?.();
  }, [buybackContract, balance, account, updateBalances]);

  return handleBuy;
};
