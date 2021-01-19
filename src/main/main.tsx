import React from 'react';

import { PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useStakingApy, useStakingBalances } from 'src/staking';
import { STAKING_CONFIG } from 'src/staking-config';
import {
  MainStaking,
  MainStablecoin,
  MainCollateral,
  MainVoting,
  MainLinks
} from './common';
import { useMainStyles } from './main.styles';

const staking = STAKING_CONFIG.slice(0, 4);

export const Main: React.FC = () => {
  const classes = useMainStyles();

  const [stakingBalances] = useStakingBalances(staking);
  const stakingBalancesWithApy = useStakingApy(stakingBalances);

  return (
    <MainLayout>
      <PageWrapper>
        <MainStaking
          className={classes.staking}
          staking={stakingBalancesWithApy}
        />
        <MainStablecoin className={classes.stable} />
        <MainCollateral className={classes.collateral} />
        <MainVoting className={classes.voting} />
        <MainLinks />
      </PageWrapper>
    </MainLayout>
  );
};
