import React, { useMemo, useRef } from 'react';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import { useHoverDirty } from 'react-use';

import { BN, Typography } from 'src/common';
import { useStablecoinCollateralProtocolStateStyles } from './stablecoin-collateral-protocol-state.styles';

enum StablecoinCollateralProtocolStates {
  balanced,
  unbalanced,
  critical
}

export type StablecoinCollateralProtocolStateProps = {
  stableCoinBalanceValue?: BN;
  issuerBalanceValue?: BN;
};

export const StablecoinCollateralProtocolState: React.VFC<StablecoinCollateralProtocolStateProps> =
  (props) => {
    const balanced = useRef(null);
    const unbalanced = useRef(null);
    const critical = useRef(null);

    const classes = useStablecoinCollateralProtocolStateStyles();
    const isHoveringBalanced = useHoverDirty(balanced);
    const isHoveringUnbalanced = useHoverDirty(unbalanced);
    const isHoveringCritical = useHoverDirty(critical);

    const collateralState = useMemo(() => {
      if (!props.stableCoinBalanceValue || !props.issuerBalanceValue)
        return StablecoinCollateralProtocolStates.balanced;

      if (props.stableCoinBalanceValue.eq(props.issuerBalanceValue))
        return StablecoinCollateralProtocolStates.balanced;

      const collateralValue = props.stableCoinBalanceValue
        .div(props.issuerBalanceValue)
        .minus(1);

      if (collateralValue.isLessThanOrEqualTo(0))
        return StablecoinCollateralProtocolStates.balanced;

      if (
        collateralValue.isGreaterThan(0) &&
        collateralValue.isLessThanOrEqualTo(0.1)
      )
        return StablecoinCollateralProtocolStates.unbalanced;

      return StablecoinCollateralProtocolStates.critical;
    }, [props.stableCoinBalanceValue, props.issuerBalanceValue]);

    return (
      <div className={classes.root}>
        <Tippy
          visible={isHoveringBalanced}
          content="The protocol is fully balanced "
          maxWidth={248}
          offset={[140, 8]}
          animation={false}
          className={classes.tippy}
        >
          <Typography
            variant="h2"
            component="span"
            ref={balanced}
            className={clsx(classes.circle, {
              [classes.green]:
                collateralState === StablecoinCollateralProtocolStates.balanced
            })}
          >
            b
          </Typography>
        </Tippy>

        <Tippy
          visible={isHoveringUnbalanced}
          content="Insufficient collateral stored but unbalance can be compensated by the funds of the protocol"
          maxWidth={248}
          offset={[140, 8]}
          animation={false}
          className={classes.tippy}
        >
          <Typography
            variant="h2"
            component="span"
            ref={unbalanced}
            className={clsx(classes.circle, {
              [classes.yellow]:
                collateralState ===
                StablecoinCollateralProtocolStates.unbalanced
            })}
          >
            u
          </Typography>
        </Tippy>
        <Tippy
          visible={isHoveringCritical}
          content="The protocol is in a critical state, the community must take immediate actions to rebalance the protocol"
          maxWidth={248}
          offset={[140, 8]}
          animation={false}
          className={classes.tippy}
        >
          <Typography
            variant="h2"
            component="span"
            ref={critical}
            className={clsx(classes.circle, {
              [classes.red]:
                collateralState === StablecoinCollateralProtocolStates.critical
            })}
          >
            c
          </Typography>
        </Tippy>
      </div>
    );
  };
