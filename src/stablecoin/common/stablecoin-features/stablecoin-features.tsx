import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Plate, Typography } from 'src/common';
import { ReactComponent as management } from 'src/assets/images/protocolsmanagement.svg';
import { ReactComponent as liquidity } from 'src/assets/images/protocolsassetsliquidity.svg';
import { ReactComponent as development } from 'src/assets/images/development_of_the_protocol.svg';
import { useStablecoinFeaturesStyles } from './stablecoin-features.styles';
import { STABLE } from '../constants';
import { StablecoinTitle } from '../stablecoin-title';

const ICONS = new Map([
  [STABLE[0].title, management],
  [STABLE[1].title, liquidity],
  [STABLE[2].title, development]
]);

export type StablecoinFeaturesProps = {
  className?: string;
};

export const StablecoinFeatures: React.FC<StablecoinFeaturesProps> = (
  props
) => {
  const classes = useStablecoinFeaturesStyles();

  return (
    <div className={props.className} id="features">
      <StablecoinTitle
        bold="Features"
        text={
          <>
            USDap is a stablecoin done right. Algorithmic automated issuance,
            real-world assets as collateral, and publicly available oracles for
            real-time collateral verification.
          </>
        }
      />
      <div className={classes.feature}>
        {STABLE.map((stableItem) => {
          const Icon = ICONS.get(stableItem.title);

          return (
            <Plate
              color="grey"
              withoutBorder
              key={stableItem.title}
              className={classes.featureCard}
            >
              {Icon && <Icon className={classes.icon} />}
              <Typography
                variant="h5"
                weight="semibold"
                className={classes.featureCardText}
              >
                {stableItem.title}
              </Typography>
              <Typography variant="h5" className={classes.featureCardText}>
                {stableItem.text}
              </Typography>
              <Typography variant="h5" className={classes.featureCardText}>
                <Link
                  component={ReactRouterLink}
                  to={stableItem.link}
                  color="blue"
                >
                  Learn more
                </Link>
              </Typography>
            </Plate>
          );
        })}
      </div>
    </div>
  );
};
