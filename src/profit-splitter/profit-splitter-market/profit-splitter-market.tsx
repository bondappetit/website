import React from 'react';
import clsx from 'clsx';

import {
  Button,
  Plate,
  Typography,
  useUniswapMarketMakerContract
} from 'src/common';
import { useSplitterBalance } from '../common';
import { useAddLiquidity } from './use-add-liquidity';
import { useBuyLiquidity } from './use-buy-liquidity';

export type ProfitSplitterMarketProps = {
  className?: string;
  updateCount: number;
  handleUpdate: () => void;
};

export const ProfitSplitterMarket: React.FC<ProfitSplitterMarketProps> = (
  props
) => {
  const marketMakerContract = useUniswapMarketMakerContract();

  const incomig = useSplitterBalance(
    marketMakerContract.methods.incoming,
    marketMakerContract.options.address,
    props.updateCount
  );
  const support = useSplitterBalance(
    marketMakerContract.methods.support,
    marketMakerContract.options.address,
    props.updateCount
  );

  const handleAddLuqidity = useAddLiquidity(
    incomig.tokenBalance?.toString(),
    support.tokenBalance?.toString(),
    props.handleUpdate
  );

  const handleBuyLuqidity = useBuyLiquidity(
    incomig.tokenBalance?.toString(),
    props.handleUpdate
  );

  return (
    <Plate className={clsx(props.className)}>
      <Typography variant="h3">Market</Typography>
      <div>
        <Typography variant="body1">
          Incoming balance: {incomig.tokenBalance?.toString(10)}{' '}
          {incomig.asset?.symbol}
        </Typography>
        <Button onClick={handleBuyLuqidity}>Buy</Button>
      </div>
      <div>
        <Typography variant="body1">
          Support balance: {support.tokenBalance?.toString(10)}{' '}
          {support.asset?.symbol}
        </Typography>
        <Button onClick={handleAddLuqidity}>Add</Button>
      </div>
    </Plate>
  );
};
