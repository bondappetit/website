import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useMedia } from 'react-use';

import { Typography, Link, Carousel } from 'src/common';
import { URLS } from 'src/router/urls';
import { MainStakingCard } from '../main-staking-card';
import { useMainStakingStyles } from './main-staking.styles';

export type MainStakingProps = {
  className?: string;
};

const Grid: React.FC = (props) => {
  const classes = useMainStakingStyles();
  const isMobile = useMedia('(max-width: 959px)');

  const Component: React.ElementType = isMobile ? Carousel : 'div';

  return (
    <Component className={classes.stakingList}>{props.children}</Component>
  );
};

export const MainStaking: React.FC<MainStakingProps> = (props) => {
  const classes = useMainStakingStyles();

  return (
    <div className={props.className}>
      <Typography variant="h1" align="center" className={classes.title}>
        The first DeFi protocol that connects real-world debt instruments with
        the Ethereum ecosystem
      </Typography>
      <Typography variant="h4" align="center" className={classes.subtitle}>
        Earn Staking Rewards in ART by locking your assets for a certain period
        of time and providing liquidity for protocol’s assets.
      </Typography>
      <Grid>
        <MainStakingCard
          tokenName="BAG"
          totalSupply="$ 960,642"
          APY="240.64%"
        />
        <MainStakingCard
          tokenName="BAG"
          totalSupply="$ 960,642"
          APY="240.64%"
        />
        <MainStakingCard
          tokenName="BAG"
          totalSupply="$ 960,642"
          APY="240.64%"
        />
        <MainStakingCard
          tokenName="BAG"
          totalSupply="$ 960,642"
          APY="240.64%"
        />
      </Grid>
      <Typography variant="h4" align="center">
        <Link component={ReactRouterLink} to={URLS.staking.list} color="blue">
          Explore Staking →
        </Link>
      </Typography>
    </div>
  );
};
