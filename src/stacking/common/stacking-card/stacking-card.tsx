import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Plate, Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useStackingCardStyles } from './stacking-card.styles';

export type StackingCardProps = {
  tokenName: string;
  reward?: string;
  delta?: string;
};

export const StackingCard: React.FC<StackingCardProps> = (props) => {
  const classes = useStackingCardStyles();

  return (
    <Link
      component={ReactRouterLink}
      to={URLS.stacking.detail(props.tokenName)}
    >
      <Plate className={classes.stakingCard}>
        <Typography variant="h3">{props.tokenName}</Typography>
        <Typography variant="body1">
          Pending harvest {props.reward} Bond
        </Typography>
        <Typography variant="body1">
          New rewards per block {props.delta} Bond
        </Typography>
      </Plate>
    </Link>
  );
};
