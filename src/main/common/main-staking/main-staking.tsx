import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useMedia } from 'react-use';

import { Typography, Link, Carousel, Plate } from 'src/common';
import { URLS } from 'src/router/urls';
import type { APYWithTokenName } from 'src/staking';
import { useMainStakingStyles } from './main-staking.styles';
import { MainHowItWorks } from '../main-how-it-works';

export type MainStakingProps = {
  className?: string;
  staking?: APYWithTokenName[];
  totalValueLocked?: string;
  countOfCards: number;
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
      <div className={classes.howItWorks}>
        <MainHowItWorks />
      </div>
      <Plate color="grey" withoutBorder className={classes.totalValueLocked}>
        <Typography variant="h4" align="center">
          Total Value Locked:{' '}
          <Typography variant="inherit" weight="bold">
            ${props.totalValueLocked}
          </Typography>
        </Typography>
      </Plate>
      <Grid>
        {/* {!props.staking?.length
          ? numberArray(props.countOfCards).map((key) => (
              <StakingCard loading={!props.staking?.length} key={key} />
            ))
          : props.staking.map((stakingItem, index) => {
              const id = String(index);

              return (
                <StakingCard
                  key={id}
                  stacked={Boolean(Number(stakingItem.amount))}
                  token={stakingItem.token}
                  reward={stakingItem.reward}
                  totalSupply={stakingItem.totalSupplyUSDC}
                  poolRate={stakingItem.poolRate}
                  lockable={stakingItem.lockable}
                  stakingContractAddress={
                    stakingItem.stakingContract.options.address
                  }
                  APY={stakingItem.APY}
                />
              );
            })} */}
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
