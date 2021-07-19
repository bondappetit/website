import clsx from 'clsx';
import React from 'react';

import { Plate } from 'src/common/plate';
import { Link } from 'src/common/link';
import { Typography } from 'src/common/typography';
import { usePhaseDescriptionStyles } from './phase-description.styles';

export const PhaseDescription: React.VFC<{ className?: string }> = (props) => {
  const classes = usePhaseDescriptionStyles();

  return (
    <Plate
      color="grey"
      withoutBorder
      className={clsx(props.className, classes.root)}
    >
      <Typography variant="h5" className={classes.text}>
        Do not be alarmed by the red light on the indicator panel. The protocol
        is transitioning to Phase 2 (
        <Link color="blue" href="/whitepaper#46">
          https://bondappetit.io/whitepaper
        </Link>
        ), which means that the first batch of bonds are in the process of being
        purchased. The transition will be concluded approximately by July 25th.
      </Typography>
    </Plate>
  );
};
