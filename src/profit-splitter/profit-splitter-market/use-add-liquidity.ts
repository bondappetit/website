import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useUniswapMarketMakerContract, estimateGas } from 'src/common';

export const useAddLiquidity = (
  incomingAmount?: string,
  supportAmount?: string,
  updateBalances?: () => void
) => {
  const { account = null } = useWeb3React<Web3>();

  const marketMakerContract = useUniswapMarketMakerContract();

  const handleAddLiquidity = useCallback(async () => {
    if (!supportAmount || !incomingAmount || !account || !marketMakerContract)
      return;

    if (Number(incomingAmount) <= 0 || Number(supportAmount) <= 0) return;

    const addLiquidity = marketMakerContract.methods.addLiquidity(0, 0);

    if (!addLiquidity) return;

    await addLiquidity.send({
      from: account,
      gas: await estimateGas(addLiquidity, { from: account })
    });

    updateBalances?.();
  }, [
    marketMakerContract,
    incomingAmount,
    supportAmount,
    account,
    updateBalances
  ]);

  return handleAddLiquidity;
};
