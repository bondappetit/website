import React from 'react';

import { PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  MainStaking,
  MainStablecoin,
  MainCollateral,
  MainVoting,
  MainLinks
} from './common';
import { useMainStyles } from './main.styles';

export const Main: React.FC = () => {
  const classes = useMainStyles();

  return (
    <MainLayout>
      <PageWrapper>
        <MainStaking className={classes.staking} />
        <MainStablecoin className={classes.stable} />
        <MainCollateral className={classes.collateral} />
        <MainVoting className={classes.voting} />
        <MainLinks />
      </PageWrapper>
    </MainLayout>
  );
};
