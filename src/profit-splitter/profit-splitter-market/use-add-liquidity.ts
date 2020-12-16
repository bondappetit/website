import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useUniswapMarketMakerContract } from 'src/common';

export const useAddLiquidity = (
  incomingAmount?: string,
  supportAmount?: string
) => {
  const { account } = useWeb3React<Web3>();

  const marketMakerContract = useUniswapMarketMakerContract();

  const handleAddLiquidity = useCallback(async () => {
    if (!supportAmount || !incomingAmount || !account) return;

    if (Number(incomingAmount) <= 0 || Number(supportAmount) <= 0) return;

    const addLiquidity = marketMakerContract?.methods.addLiquidity(
      incomingAmount,
      supportAmount
    );

    if (!addLiquidity) return;

    await addLiquidity.send({
      from: account,
      gas: await addLiquidity.estimateGas()
    });
  }, [marketMakerContract, incomingAmount, supportAmount, account]);

  return handleAddLiquidity;
};
