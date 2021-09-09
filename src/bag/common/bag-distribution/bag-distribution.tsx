import clsx from 'clsx';
import React from 'react';

import { Plate, Typography } from 'src/common';
import { FACTOID } from '../constants';
import { BagTitle } from '../bag-title';
import { useBagDistributionStyles } from './bag-distribution.styles';

export type BagDistributionProps = {
  className?: string;
};

export const BagDistribution: React.VFC<BagDistributionProps> = (props) => {
  const classes = useBagDistributionStyles();

  return (
    <div className={clsx(props.className)} id="distribution">
      <BagTitle
        title="Fair and transparent distribution"
        text={
          <>
            BAG is the main reward and the incentive tool for participants of
            the protocol and the community. Distribution of BAG is fully
            transparent and moderated by protocol&apos;s community-driven
            governance.
          </>
        }
      />
      <Plate color="grey" withoutBorder className={classes.plate}>
        <div className={classes.factoidText}>
          <Typography variant="h2">
            <Typography variant="inherit" weight="bold">
              65%
            </Typography>{' '}
            of all 100,000,000 BAG reserved for protocol usage and future
            governance participation incentives.
          </Typography>
          <ul className={classes.factoid}>
            {FACTOID.map((fact) => (
              <li className={classes.factoidItem} key={fact.text}>
                <Typography
                  variant="body1"
                  className={classes.factoidItemContent}
                >
                  <Typography variant="inherit" weight="bold">
                    {fact.percent}
                  </Typography>{' '}
                  <Typography variant="inherit">{fact.text}</Typography>
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </Plate>
    </div>
  );
};
