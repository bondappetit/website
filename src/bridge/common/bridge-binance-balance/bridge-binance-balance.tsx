import React from 'react';
import networks from '@bondappetit/networks';

import { Button, cutAccount, Link, Typography } from 'src/common';
import { useBridgeBinanceBalanceStyles } from './bridge-binance-balance.styles';

export type BridgeBinanceBalanceProps = {
  className?: string;
  children?: string;
};

const BUY_BNB = 'https://www.binance.com/en/buy-BNB';

const BLOG_URL = 'https://medium.com/bondappetit';

export const BridgeBinanceBalance: React.VFC<BridgeBinanceBalanceProps> = (
  props
) => {
  const classes = useBridgeBinanceBalanceStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        component="div"
        align="center"
        className={classes.title}
      >
        {'To pay transaction fees you must have at least \n 0.05 BNB on'}{' '}
        <Link
          color="blue"
          target="_blank"
          href={`${networks.mainBSC.networkEtherscan}/address/${props.children}`}
        >
          {cutAccount(props.children ?? '')}
        </Link>
      </Typography>
      <div className={classes.actions}>
        <Button
          className={classes.button}
          component={Link}
          href={BLOG_URL}
          target="_blank"
        >
          Buy BNB
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          component={Link}
          href={BUY_BNB}
          target="_blank"
        >
          How transfer works
        </Button>
      </div>
    </div>
  );
};
