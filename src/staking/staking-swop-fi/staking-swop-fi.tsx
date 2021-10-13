import React from 'react';

import { COIN_ICONS, humanizeNumeral, Link, Typography } from 'src/common';
import { ReactComponent as SwopfiIcon } from 'src/assets/icons/swopfi.svg';
import { StakingLabel } from '../common';
import { useStakingSwopFiStyles } from './staking-swop-fi.styles';

export type StakingSwopFiProps = {
  className?: string;
  apy?: string;
  tvl?: string;
  loading: boolean;
  token: 'BAG' | 'USDap';
};

const SWOP_FI_BAG_POOL_URL =
  'https://swop.fi/info/3PAgYAV4jYJ7BF8LCVNU9tyWCBtQaqeLQH4';
const SWOP_FI_USDAP_POOL_URL =
  'https://swop.fi/info/3PPtpEVDy6suxgBQTPMwaVosinkhoVL7QUn';

export const StakingSwopFi: React.VFC<StakingSwopFiProps> = (props) => {
  const classes = useStakingSwopFiStyles();

  const { loading, token } = props;

  const TOKENS = [token, 'USDN'];

  return (
    <Link
      target="_blank"
      href={token === 'BAG' ? SWOP_FI_BAG_POOL_URL : SWOP_FI_USDAP_POOL_URL}
      className={classes.root}
    >
      <SwopfiIcon className={classes.icon} />
      <Typography
        variant="h3"
        weight="bold"
        align="center"
        className={classes.title}
      >
        {props.loading
          ? 'Loading pool...'
          : TOKENS?.map((title, index) => {
              const Icon = COIN_ICONS.get(title);

              return (
                <React.Fragment key={title}>
                  {Icon && <Icon className={classes.icon} />} {title}{' '}
                  {index === 0 && TOKENS.length === 2 && (
                    <span className={classes.plus}>+</span>
                  )}
                </React.Fragment>
              );
            })}
      </Typography>
      <Typography variant="h3" align="center" className={classes.apy}>
        APY {props.loading ? '...' : <>{humanizeNumeral(props.apy)} %</>}
      </Typography>
      <StakingLabel
        title="Total value locked"
        value={`$${humanizeNumeral(props.tvl)}`}
        variant="body1"
        loading={loading}
      />
      <StakingLabel
        title="Earn"
        value="SWOP"
        variant="body1"
        loading={loading}
      />
      <StakingLabel
        title="Network"
        value="Waves"
        variant="body1"
        loading={loading}
      />
    </Link>
  );
};
