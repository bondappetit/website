import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useMedia } from 'react-use';

import { Typography, Link, Carousel, Skeleton, BN, Plate } from 'src/common';
import { URLS } from 'src/router/urls';
import type { APYWithTokenName } from 'src/staking';
import { MainStakingCard } from '../main-staking-card';
import { useMainStakingStyles } from './main-staking.styles';

export type MainStakingProps = {
  className?: string;
  staking: APYWithTokenName[];
  totalValueLocked: string;
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
      <Plate color="grey" withoutBorder className={classes.totalValueLocked}>
        <Typography variant="h4" align="center">
          Total Value Locked:{' '}
          <Typography variant="inherit" weight="bold">
            ${props.totalValueLocked}
          </Typography>
        </Typography>
      </Plate>
      <Grid>
        {!props.staking.length
          ? Array.from(Array(2), (_, key) => (
              <Skeleton key={key} className={classes.skeleton} />
            ))
          : props.staking.map((stakingItem, index) => {
              const id = String(index);

              return (
                <MainStakingCard
                  key={id}
                  token={stakingItem.token}
                  stakingContractAddress={
                    stakingItem.stakingContract.options.address
                  }
                  tokenKey={stakingItem.key}
                  totalSupply={new BN(stakingItem.totalSupply)
                    .multipliedBy(stakingItem.stakingTokenUSDC)
                    .toFormat(2)}
                  APY={stakingItem.APY}
                />
              );
            })}
      </Grid>
      <Typography variant="h4" align="center" className={classes.subtitle}>
        Earn Staking Rewards in BAG by locking your assets for a certain period
        of time and providing liquidity for protocol’s assets.
      </Typography>
      <Typography variant="h4" align="center">
        <Link component={ReactRouterLink} to={URLS.staking.list} color="blue">
          Explore Staking →
        </Link>
      </Typography>
    </div>
  );
};
