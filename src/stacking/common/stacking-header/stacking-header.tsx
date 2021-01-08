import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import clsx from 'clsx';

import { ReactComponent as ArrowLeftIcon } from 'src/assets/icons/arrow-left-bold.svg';
import { Link, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { ICONS } from '../constants';
import { useStackingHeaderStyles } from './stacking-header.styles';

export type StackingHeaderProps = {
  tokenName: string | null;
  tokenKey: string;
  APY?: string;
  className?: string;
};

export const StackingHeader: React.FC<StackingHeaderProps> = (props) => {
  const classes = useStackingHeaderStyles({
    tokenName: props.tokenKey
  });

  const Icon = ICONS[props.tokenKey];

  return (
    <div className={clsx(classes.root, props.className)}>
      <Link
        component={ReactRouterLink}
        className={classes.link}
        to={URLS.stacking.list}
      >
        <ArrowLeftIcon className={classes.linkIcon} />
      </Link>
      <div className={classes.content}>
        <div className={classes.title}>
          <Typography variant="h2" weight="bold" align="center">
            <Icon /> {props.tokenName}
          </Typography>
          <Typography variant="h2" align="center">
            APY {props.APY} %
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography variant="body1" component="span">
            Deposit:{' '}
            <Typography variant="inherit" component="span" weight="bold">
              {props.tokenName}
            </Typography>
          </Typography>
          <Typography variant="body1" component="span">
            Earn:{' '}
            <Typography variant="inherit" component="span" weight="bold">
              {props.tokenName}
            </Typography>
          </Typography>
        </div>
      </div>
    </div>
  );
};
