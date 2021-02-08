import React, { useMemo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Typography,
  Link,
  Status,
  STAKING_ICONS,
  BN,
  humanizeNumeral
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useStakingCardStyles } from './staking-card.styles';

export type StakingCardProps = {
  tokenKey: string;
  stacked?: boolean;
  reward?: BN;
  APY?: BN;
  token: string[];
  stakingContractAddress: string;
  totalSupply: BN;
  poolRate: BN;
};

export const StakingCard: React.FC<StakingCardProps> = (props) => {
  const tokenName = useMemo(() => props.token.join('_'), [props.token]);

  const classes = useStakingCardStyles({
    tokenName
  });

  return (
    <Link
      component={ReactRouterLink}
      to={URLS.staking.detail(props.stakingContractAddress)}
      className={classes.stakingCard}
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
        {props.token.map((title, index) => {
          const Icon = STAKING_ICONS[title];

          return (
            <React.Fragment key={title}>
              {Icon && <Icon className={classes.icon} />} {title}{' '}
              {index === 0 && props.token.length === 2 && (
                <span className={classes.plus}>+</span>
              )}
            </React.Fragment>
          );
        })}
      </Typography>
      <Typography variant="h3" align="center" className={classes.apy}>
        APY {humanizeNumeral(props.APY)} %
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
      <Typography variant="body1" align="center">
        Total Supply:{' '}
        <Typography variant="inherit" weight="bold">
          ${humanizeNumeral(props.totalSupply)}
        </Typography>
      </Typography>
      <Typography variant="body1" align="center">
        Pool rate:{' '}
        <Typography variant="inherit" weight="bold">
          {humanizeNumeral(props.poolRate)} BAG / month
        </Typography>
      </Typography>
      <Typography variant="body1" align="center">
        Locking:{' '}
        <Typography variant="inherit" weight="bold">
          6 month
        </Typography>
      </Typography>
    </Link>
  );
};
