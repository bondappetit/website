import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useBudgetContract, estimateGas } from 'src/common';

export const usePay = (ethBalance?: string, updateBalances?: () => void) => {
  const { account } = useWeb3React<Web3>();

  const budgetContract = useBudgetContract();

  const handlePay = useCallback(async () => {
    if (!account) return;

    if (Number(ethBalance) <= 0) return;

    const pay = budgetContract.methods.pay();

    await pay.send({
      from: account,
      gas: await estimateGas(pay, { from: account })
    });

    updateBalances?.();
  }, [account, budgetContract, ethBalance, updateBalances]);

  return handlePay;
};
