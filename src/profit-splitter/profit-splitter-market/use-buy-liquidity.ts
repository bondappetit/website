import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useUniswapMarketMakerContract } from 'src/common';

export const useBuyLiquidity = (
  balance?: string,
  updateBalances?: () => void
) => {
  const { account } = useWeb3React<Web3>();

  const marketMakerContract = useUniswapMarketMakerContract();

  const handleBuyLiquidity = useCallback(async () => {
    if (!balance || !account) return;

    if (Number(balance) <= 0) return;

    const buyLiquidity = marketMakerContract?.methods.buyLiquidity(0);

    if (!buyLiquidity) return;

    await buyLiquidity.send({
      from: account,
      gas: await buyLiquidity.estimateGas({ from: account })
    });

    updateBalances?.();
  }, [marketMakerContract, balance, account, updateBalances]);

  return handleBuyLiquidity;
};
