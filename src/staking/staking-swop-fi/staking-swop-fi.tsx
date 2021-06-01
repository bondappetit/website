import React from 'react';

import { Link, Typography } from 'src/common';
import { ReactComponent as SwopfiIcon } from 'src/assets/icons/swopfi.svg';
import { StakingLabel } from '../common';
import { useStakingSwopFiStyles } from './staking-swop-fi.styles';

export type StakingSwopFiProps = {
  className?: string;
};

const SWOP_FI_POOL_URL = 'https://swop.fi/pool';

export const StakingSwopFi: React.VFC<StakingSwopFiProps> = () => {
  const classes = useStakingSwopFiStyles();

  const loading = false;

  return (
    <Link target="_blank" href={SWOP_FI_POOL_URL} className={classes.root}>
      <SwopfiIcon className={classes.icon} />
      <Typography variant="h3" className={classes.title}>
        Stake BAG on swop.fi
      </Typography>
      <StakingLabel
        title="Earn"
        value="WAVES"
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
