import clsx from 'clsx';
import React, { useMemo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Typography,
  Link,
  Status,
  COIN_ICONS,
  BN,
  humanizeNumeral
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useStakingCardStyles } from './staking-card.styles';

export type StakingCardProps = {
  stacked?: boolean;
  reward?: BN;
  APY?: BN;
  token?: string[];
  stakingContractAddress?: string;
  totalSupply?: BN;
  poolRate?: BN;
  lockable?: boolean;
  loading?: boolean;
};

export const StakingCard: React.FC<StakingCardProps> = (props) => {
  const tokenName = useMemo(() => props.token?.join('_'), [props.token]);

  const classes = useStakingCardStyles();

  return (
    <Link
      component={ReactRouterLink}
      to={URLS.staking.detail(props.stakingContractAddress)}
      className={clsx(classes.stakingCard, {
        [classes.loading]: props.loading
      })}
    >
      {props.stacked && (
        <Status color="black" variant="contained" className={classes.stacked}>
          Staked
        </Status>
      )}
      <Typography
        variant="h3"
        weight="bold"
        align="center"
        className={classes.title}
      >
        {props.loading
          ? 'Loading pool...'
          : props.token?.map((title, index) => {
              const Icon = COIN_ICONS.get(title);

              return (
                <React.Fragment key={title}>
                  {Icon && <Icon className={classes.icon} />} {title}{' '}
                  {index === 0 && props.token?.length === 2 && (
                    <span className={classes.plus}>+</span>
                  )}
                </React.Fragment>
              );
            })}
      </Typography>
      <Typography variant="h3" align="center" className={classes.apy}>
        APY {props.loading ? '...' : <>{humanizeNumeral(props.APY)} %</>}
      </Typography>
      <Typography variant="body1" align="center" className={classes.deposit}>
        Deposit:{' '}
        <Typography variant="inherit" component="span" weight="bold">
          {props.loading ? '...' : tokenName}
        </Typography>
      </Typography>
      <Typography variant="body1" align="center">
        Earn:{' '}
        {props.loading ? (
          '...'
        ) : (
          <Typography variant="inherit" component="span" weight="bold">
            BAG
          </Typography>
        )}
      </Typography>
      <Typography variant="body1" align="center">
        Total value locked:{' '}
        {props.loading ? (
          '...'
        ) : (
          <Typography variant="inherit" weight="bold">
            ${humanizeNumeral(props.totalSupply)}
          </Typography>
        )}
      </Typography>
      <Typography variant="body1" align="center">
        Pool rate:{' '}
        {props.loading ? (
          '...'
        ) : (
          <Typography variant="inherit" weight="bold">
            {humanizeNumeral(props.poolRate)} BAG / day
          </Typography>
        )}
      </Typography>
      {props.lockable && (
        <Typography variant="body1" align="center">
          Lockup:{' '}
          {props.loading ? (
            '...'
          ) : (
            <Typography variant="inherit" weight="bold">
              3 month
            </Typography>
          )}
        </Typography>
      )}
    </Link>
  );
};
