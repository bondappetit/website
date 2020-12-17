import React from 'react';

import { MainLayout } from 'src/layouts';
import { PageWrapper } from 'src/common';
import { MarketBuyBond } from 'src/market/market-buy-bond';
import { MarketBuyAbt } from 'src/market/market-buy-abt';
import { useMarketFormsStyles } from './market-forms.styles';

export const MarketForms: React.FC = () => {
  const classes = useMarketFormsStyles();

  return (
    <MainLayout>
      <PageWrapper>
        <MarketBuyBond className={classes.form} />
        <MarketBuyAbt className={classes.form} />
      </PageWrapper>
    </MainLayout>
  );
};
