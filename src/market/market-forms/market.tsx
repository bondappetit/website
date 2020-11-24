import React from 'react';

import { MainLayout } from 'src/layouts';
import { MarketBuyBond } from 'src/market/market-buy-bond';
import { MarketBuyArt } from 'src/market/market-buy-art';
import { useMarketStyles } from './market.styles';

export const Market: React.FC = () => {
  const classes = useMarketStyles();

  return (
    <MainLayout>
      <div className={classes.market}>
        <MarketBuyBond className={classes.form} />
        <MarketBuyArt className={classes.form} />
      </div>
    </MainLayout>
  );
};
