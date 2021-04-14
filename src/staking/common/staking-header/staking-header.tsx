import React from 'react';
import clsx from 'clsx';

import { Typography, COIN_ICONS, BN, humanizeNumeral } from 'src/common';
import { useStakingHeaderStyles } from './staking-header.styles';
import { StakingLabel } from '../staking-label';

export type StakingHeaderProps = {
  token?: string[];
  tokenKey: string;
  APY?: BN;
  totalSupply?: BN;
  className?: string;
  poolRate?: BN;
  volumeUSD?: string;
  lockable?: boolean;
  loading: boolean;
  depositToken?: string;
};

export const StakingHeader: React.FC<StakingHeaderProps> = (props) => {
  const classes = useStakingHeaderStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.content}>
        <div className={classes.title}>
          <Typography variant="h2" weight="bold" align="center">
            {props.loading
              ? 'Loading pool...'
              : props.token?.map((title, index) => {
                  const Icon = COIN_ICONS.get(title);

                  return (
                    <React.Fragment key={title}>
                      {Icon && <Icon />} {title}{' '}
                      {index === 0 && props.token?.length === 2 ? ' + ' : null}
                    </React.Fragment>
                  );
                })}
          </Typography>
          <Typography variant="h2" align="center">
            APY {props.loading ? '...' : <>{humanizeNumeral(props.APY)} %</>}
          </Typography>
        </div>
        <div className={classes.info}>
          <StakingLabel
            variant="body1"
            title="Deposit"
            value={props.depositToken}
            loading={props.loading}
          />
          <StakingLabel
            variant="body1"
            title="Earn"
            value="BAG"
            loading={props.loading}
          />
          <StakingLabel
            variant="body1"
            title="Total value locked"
            value={<>${humanizeNumeral(props.totalSupply)}</>}
            loading={props.loading}
          />
          <StakingLabel
            variant="body1"
            title="Pool rate"
            value={<>{humanizeNumeral(props.poolRate)} BAG / day</>}
            loading={props.loading}
          />

          {props.lockable && (
            <StakingLabel
              variant="body1"
              title="Lockup"
              value={<>3 month</>}
              loading={props.loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
