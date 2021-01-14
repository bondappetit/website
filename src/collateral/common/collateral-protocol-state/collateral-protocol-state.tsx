import React, { useRef } from 'react';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import { useHoverDirty, useMedia } from 'react-use';

import { Typography } from 'src/common';
import { useCollateralProtocolStateStyles } from './collateral-protocol-state.styles';

export type CollateralProtocolStateProps = unknown;

export const CollateralProtocolState: React.FC<CollateralProtocolStateProps> = () => {
  const balanced = useRef(null);
  const unbalanced = useRef(null);
  const critical = useRef(null);

  const classes = useCollateralProtocolStateStyles();
  const isHoveringBalanced = useHoverDirty(balanced);
  const isHoveringUnbalanced = useHoverDirty(unbalanced);
  const isHoveringCritical = useHoverDirty(critical);

  const isMobile = useMedia('(max-width: 959px)');

  return (
    <div className={classes.root}>
      <Tippy
        visible={isHoveringBalanced}
        content="Description what this means, description what this means, description what this means"
        maxWidth={248}
        offset={[140, 8]}
        className={classes.tippy}
      >
        <Typography
          variant="h2"
          component="span"
          ref={balanced}
          className={clsx(classes.circle, classes.green)}
        >
          {isMobile ? 'balanced' : 'b'}
        </Typography>
      </Tippy>

      <Tippy
        visible={isHoveringUnbalanced}
        content="Description what this means, description what this means, description what this means"
        maxWidth={248}
        offset={[140, 8]}
        className={classes.tippy}
      >
        <Typography
          variant="h2"
          component="span"
          ref={unbalanced}
          className={clsx(classes.circle)}
        >
          {isMobile ? 'unbalanced' : 'u'}
        </Typography>
      </Tippy>
      <Tippy
        visible={isHoveringCritical}
        content="Description what this means, description what this means, description what this means"
        maxWidth={248}
        offset={[140, 8]}
        className={classes.tippy}
      >
        <Typography
          variant="h2"
          component="span"
          ref={critical}
          className={clsx(classes.circle)}
        >
          {isMobile ? 'critical' : 'c'}
        </Typography>
      </Tippy>
    </div>
  );
};
