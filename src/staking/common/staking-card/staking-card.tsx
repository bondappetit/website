import React, { useMemo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link, Status, STAKING_ICONS } from 'src/common';
import { URLS } from 'src/router/urls';
import { useStakingCardStyles } from './staking-card.styles';

export type StakingCardProps = {
  tokenKey: string;
  stacked?: boolean;
  reward?: string;
  APY?: string;
  token: string[];
};

export const StakingCard: React.FC<StakingCardProps> = (props) => {
  const tokenName = useMemo(() => props.token.join('_'), [props.token]);

  const classes = useStakingCardStyles({
    tokenName
  });

  return (
    <Link
      component={ReactRouterLink}
      to={`${URLS.staking.detail(props.tokenKey)}`}
      className={classes.stakingCard}
    >
      {props.stacked && (
        <Status color="black" variant="contained" className={classes.stacked}>
          Staked
        </Status>
      )}
      <Typography variant="h2" weight="bold" align="center">
        {props.token.map((title, index) => {
          const Icon = STAKING_ICONS[title];

          return (
            <React.Fragment key={title}>
              {Icon && <Icon />} {title}{' '}
              {index === 0 && props.token.length === 2 ? ' + ' : null}
            </React.Fragment>
          );
        })}
      </Typography>
      <Typography variant="h2" align="center" className={classes.apy}>
        APY {props.APY} %
      </Typography>
      <Typography variant="body1" align="center" className={classes.deposit}>
        Deposit:{' '}
        <Typography variant="inherit" component="span" weight="bold">
          {tokenName}
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
