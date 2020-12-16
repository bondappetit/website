import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useBudgetContract } from 'src/common';

export const usePay = (ethBalance?: string) => {
  const { account } = useWeb3React<Web3>();

  const budgetContract = useBudgetContract();

  const handlePay = useCallback(async () => {
    if (!budgetContract || !account) return;

    if (Number(ethBalance) <= 0) return;

    await budgetContract.methods.pay().send({
      from: account
    });
  }, [account, budgetContract, ethBalance]);

  return handlePay;
};
