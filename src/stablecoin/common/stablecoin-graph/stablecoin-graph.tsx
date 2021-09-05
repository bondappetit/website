import clsx from 'clsx';
import React from 'react';

import { Typography, BN, Plate, humanizeNumeral } from 'src/common';
import { useStablecoinGraphStyles } from './stablecoin-graph.styles';
import { StablecoinChart } from '../stablecoin-chart';

export type StablecoinGraphProps = {
  className?: string;
  issuerBalance?: BN;
  loading: boolean;
};

export const StablecoinGraph: React.FC<StablecoinGraphProps> = (props) => {
  const classes = useStablecoinGraphStyles();

  return (
    <div className={clsx(classes.root, props.className)} id="usdap">
      <Plate className={classes.inner}>
        <Typography variant="body1" align="center" className={classes.title}>
          {props.loading && '...'}
          <Typography variant="inherit" component="span">
            {!props.loading && (
              <>
                Total Issuance:{' '}
                <Typography
                  variant="inherit"
                  component="span"
                  weight="semibold"
                >
                  {humanizeNumeral(props.issuerBalance)} USDap
                </Typography>
              </>
            )}
          </Typography>
        </Typography>
        <StablecoinChart className={classes.chart} />
      </Plate>
      {props.children}
    </div>
  );
};
