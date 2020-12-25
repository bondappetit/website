import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import HatOutline from 'src/assets/images/hat-outline.svg';
import { useStackingCardStyles } from './stacking-card.styles';

export type StackingCardProps = {
  tokenKey: string;
  tokenName: string;
  reward?: string;
  delta?: string;
  APY?: string;
};

export const StackingCard: React.FC<StackingCardProps> = (props) => {
  const classes = useStackingCardStyles({
    img: HatOutline,
    tokenName: props.tokenKey
  });

  return (
    <Link
      component={ReactRouterLink}
      to={`${URLS.stacking.detail(props.tokenKey)}?tokenName=${
        props.tokenName
      }`}
      className={classes.stakingCard}
    >
      <Typography variant="h2" weight="bold" align="center">
        {props.tokenName}
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
          {props.tokenName}
        </Typography>
      </Typography>
    </Link>
  );
};
