import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, STAKING_ICONS, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useMainStakingCardStyles } from './main-staking-card.style';

export type MainStakingCardProps = {
  className?: string;
  token?: string[];
  tokenKey: string;
  APY?: string;
  totalSupply?: string;
  stakingContractAddress: string;
};

export const MainStakingCard: React.FC<MainStakingCardProps> = (props) => {
  const classes = useMainStakingCardStyles();

  const tokenName = props.token?.join('_');

  return (
    <Link
      component={ReactRouterLink}
      to={URLS.staking.detail(props.stakingContractAddress)}
      className={clsx(classes.root, props.className)}
    >
      <div className={classes.head}>
        <Typography variant="h3" align="center" weight="bold">
          {props.token?.map((title, index) => {
            const Icon = STAKING_ICONS[title];

            return (
              <React.Fragment key={title}>
                {Icon && <Icon />} {title}{' '}
                {index === 0 && props.token?.length === 2 ? ' + ' : null}
              </React.Fragment>
            );
          })}
        </Typography>
        <Typography variant="h3" align="center">
          APY: {props.APY} %
        </Typography>
      </div>
      <div>
        <Typography variant="body1" align="center">
          Deposit:{' '}
          <Typography variant="inherit" weight="bold">
            {tokenName}
          </Typography>
        </Typography>
        <Typography variant="body1" align="center">
          Earn:{' '}
          <Typography variant="inherit" weight="bold">
            BAG
          </Typography>
        </Typography>
        <Typography variant="body1" align="center">
          Total Supply:{' '}
          <Typography variant="inherit" weight="bold">
            $ {props.totalSupply}
          </Typography>
        </Typography>
      </div>
    </Link>
  );
};
