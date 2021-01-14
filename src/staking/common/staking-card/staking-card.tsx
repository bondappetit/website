import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link, Status } from 'src/common';
import { URLS } from 'src/router/urls';
import { ICONS } from '../constants';
import { useStakingCardStyles } from './staking-card.styles';

export type StakingCardProps = {
  tokenKey: string;
  tokenName: string;
  stacked?: boolean;
  reward?: string;
  APY?: string;
};

export const StakingCard: React.FC<StakingCardProps> = (props) => {
  const classes = useStakingCardStyles({
    tokenName: props.tokenKey
  });

  const Icon = ICONS[props.tokenKey];

  return (
    <Link
      component={ReactRouterLink}
      to={`${URLS.staking.detail(props.tokenKey)}?tokenName=${props.tokenName}`}
      className={classes.stakingCard}
    >
      {props.stacked && (
        <Status color="black" variant="contained" className={classes.stacked}>
          Staked
        </Status>
      )}
      <Typography variant="h2" weight="bold" align="center">
        <Icon /> {props.tokenName}
      </Typography>
      <Typography variant="h2" align="center" className={classes.apy}>
        APY {props.APY} %
      </Typography>
      <Typography variant="body1" align="center" className={classes.deposit}>
        Deposit:{' '}
        <Typography variant="inherit" component="span" weight="bold">
          {props.tokenName}
        </Typography>
      </Typography>
      <Typography variant="body1" align="center">
        Earn:{' '}
        <Typography variant="inherit" component="span" weight="bold">
          BAG
        </Typography>
      </Typography>
    </Link>
  );
};
