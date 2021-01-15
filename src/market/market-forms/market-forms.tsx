import React from 'react';

import { MainLayout } from 'src/layouts';
import { PageWrapper } from 'src/common';
import { MarketBuyBond } from 'src/market/market-buy-governance-token';
import { MarketBuyStableToken } from 'src/market/market-buy-stable-token';
import { useMarketFormsStyles } from './market-forms.styles';

export const MarketForms: React.FC = () => {
  const classes = useMarketFormsStyles();

  return (
    <MainLayout>
      <PageWrapper>
        <MarketBuyBond className={classes.form} />
        <MarketBuyStableToken className={classes.form} />
      </PageWrapper>
    </MainLayout>
  );
};
