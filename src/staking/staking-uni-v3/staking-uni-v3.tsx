import React from 'react';

import { COIN_ICONS, humanizeNumeral, Link, Typography } from 'src/common';
import { useUniswapV3PairQuery } from 'src/graphql/_generated-hooks';
import { StakingLabel } from '../common';
import { useStakingUniV3Styles } from './staking-uni-v3.styles';

export type StakingUniV3Props = {
  className?: string;
};

const UNI_V3_POOL_ADDRESS = '0xf51df2c10678d13c50768f2d4c7f1bc12a53f08b';
const UNI_V3_POOL_URL = 'https://info.uniswap.org/#/pools';
const TOKENS = ['USDap', 'USDC'];

export const StakingUniV3: React.VFC<StakingUniV3Props> = () => {
  const classes = useStakingUniV3Styles();

  const { data, loading } = useUniswapV3PairQuery({
    variables: {
      filter: {
        address: UNI_V3_POOL_ADDRESS
      }
    }
  });

  return (
    <Link
      target="_blank"
      href={`${UNI_V3_POOL_URL}/${UNI_V3_POOL_ADDRESS}`}
      className={classes.root}
    >
      <Typography
        variant="h3"
        weight="bold"
        align="center"
        className={classes.title}
      >
        {loading
          ? 'Loading pool...'
          : TOKENS.map((title, index) => {
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
      <StakingLabel
        title="Total value locked"
        value={`$${humanizeNumeral(
          data?.uniswapV3Pair.data?.totalLiquidityUSD
        )}`}
        variant="body1"
        loading={loading}
      />
      <StakingLabel
        title="Network"
        value="Ethereum"
        variant="body1"
        loading={loading}
      />
    </Link>
  );
};
