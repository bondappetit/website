import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useUniswapMarketMakerContract } from 'src/common';

export const useAddLiquidity = (
  incominAmount?: string,
  supportAmount?: string
) => {
  const { account } = useWeb3React<Web3>();

  const marketMakerContract = useUniswapMarketMakerContract();

  const handleAddLiquidity = useCallback(async () => {
    if (!supportAmount || !incominAmount || !account) return;

    const addLiquidity = marketMakerContract?.methods.addLiquidity(
      incominAmount,
      supportAmount
    );

    if (!addLiquidity) return;

    await addLiquidity.send({
      from: account,
      gas: await addLiquidity.estimateGas()
    });
  }, [marketMakerContract, incominAmount, supportAmount, account]);

  return handleAddLiquidity;
};
