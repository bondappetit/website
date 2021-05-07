import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import { humanizeNumeral, Typography } from 'src/common';
import { useGovernanceCost } from 'src/staking';
import { ReactComponent as UniswapIcon } from 'src/assets/icons/bag/uniswap1.svg';
import { ReactComponent as CakeIcon } from 'src/assets/icons/bag/cake.svg';
import { ReactComponent as WavesIcon } from 'src/assets/icons/bag/waves.svg';
import { ReactComponent as EthIcon } from 'src/assets/icons/bag/ethereum1.svg';
import { ReactComponent as ExchangeIcon } from 'src/assets/icons/bag/exchange.svg';
import { ReactComponent as BinanceIcon } from 'src/assets/icons/bag/binance.svg';
import { ReactComponent as USDTIcon } from 'src/assets/icons/bag/usdt1.svg';
import { ReactComponent as USDNIcon } from 'src/assets/icons/bag/usdn1.svg';
import { ReactComponent as USDCIcon } from 'src/assets/icons/bag/usdc1.svg';
import { useStakingTotal } from 'src/voting/voting-staking';
import { URLS } from 'src/router/urls';
import { useBagBlocksStyles } from './bag-blocks.styles';
import { BagBlocksCard } from '../bag-blocks-card/bag-blocks-card';

export type BagBlocksProps = {
  className?: string;
};

export const BagBlocks: React.VFC<BagBlocksProps> = (props) => {
  const classes = useBagBlocksStyles();

  const govTokenCost = useGovernanceCost();

  const history = useHistory();

  const { leftTokens, totalSupplySum, percent } = useStakingTotal();

  return (
    <div className={clsx(classes.root, props.className)}>
      <BagBlocksCard
        title="Buy on the market"
        subtitle={
          <Typography variant="h2">
            BAG = ${humanizeNumeral(govTokenCost.governanceInUSDC)}
          </Typography>
        }
        icons={
          <>
            <UniswapIcon className={classes.swapIcon} />
            <CakeIcon className={classes.swapIcon} />
            <WavesIcon className={classes.swapIcon} />
          </>
        }
        button="Buy"
        onClick={() => history.push(URLS.voting.info)}
      />
      <BagBlocksCard
        title="Transfer BAG between Ethereum Network and Binance Smart Chain"
        icons={
          <>
            <EthIcon className={classes.swapIcon} />
            <ExchangeIcon className={classes.swapIcon} />
            <BinanceIcon className={classes.swapIcon} />
          </>
        }
        button="Transfer"
        onClick={() => history.push(URLS.bridge)}
      />
      <BagBlocksCard
        title="Earn as reward by staking"
        subtitle={`${leftTokens} of ${totalSupplySum} BAG remained`}
        percent={percent.toString(10)}
        icons={
          <>
            <USDCIcon className={classes.coinIcon} />
            <USDTIcon className={classes.coinIcon} />
            <USDNIcon className={classes.coinIcon} />
          </>
        }
        button="Earn"
        onClick={() => history.push(URLS.staking.list)}
      />
    </div>
  );
};
