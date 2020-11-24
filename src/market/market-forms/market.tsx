import React from 'react';

import { MainLayout } from 'src/layouts';
import { MarketBuyBond } from 'src/market/market-buy-bond';
import { MarketBuyAbt } from 'src/market/market-buy-abt';
import { useMarketStyles } from './market.styles';

export const Market: React.FC = () => {
  const classes = useMarketStyles();

  return (
    <MainLayout>
      <div className={classes.market}>
        <MarketBuyBond className={classes.form} />
        <MarketBuyAbt className={classes.form} />
      </div>
    </MainLayout>
  );
};
