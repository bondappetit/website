import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useMedia } from 'react-use';

import { Typography, Link, Carousel, numberArray, Plate } from 'src/common';
import { URLS } from 'src/router/urls';
import { SakingItem, StakingCard } from 'src/staking';
import { useMainStakingStyles } from './main-staking.styles';

export type MainStakingProps = {
  className?: string;
  staking?: SakingItem[];
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
      <Grid>
        {!props.staking?.length
          ? numberArray(props.countOfCards).map((key) => (
              <StakingCard loading={!props.staking?.length} key={key} />
            ))
          : props.staking.map((stakingItem, index) => {
              const id = String(index);

              return (
                <StakingCard
                  key={id}
                  stacked={stakingItem.stacked}
                  token={stakingItem.token}
                  totalValueLocked={stakingItem.totalValueLocked}
                  poolRate={stakingItem.poolRate}
                  lockable={stakingItem.lockable}
                  unstakingStartDate={stakingItem.unstakingStartDate}
                  stakingContractAddress={stakingItem.configAddress}
                  APY={stakingItem.apy}
                  chainId={stakingItem.chainId}
                  earnToken={stakingItem.earnToken}
                  stakingEndBlock={stakingItem.stakingEndBlock}
                  stakingEndDate={stakingItem.stakingEndDate}
                />
              );
            })}
        <Plate withoutBorder color="grey" className={classes.stakingText}>
          <Typography variant="h5">
            Earn Staking Rewards in BAG by locking your assets for a certain
            period of time and providing liquidity for protocol’s assets.
          </Typography>
          <Typography variant="h5">
            <Link
              component={ReactRouterLink}
              to={URLS.staking.list}
              color="blue"
            >
              Explore Staking
            </Link>
          </Typography>
        </Plate>
      </Grid>
    </div>
  );
};
